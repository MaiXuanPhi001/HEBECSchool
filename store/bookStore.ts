import { action, computed, makeAutoObservable, observable } from "mobx";
import { Children } from "react";
import request from "../utils/request";
import userStore from "./userStore";

export const apiBook = {
    getCategories: () => request({
        url: "/v1/customer/category?",
        method: "GET"
    }),
    getCategoryHightlight: () => request({
        url: "/v1/customer/category/highlight",
        method: "GET"
    }),
    getBooks: ( page: number,categoryId: number, search: string, sort: string) => request({
        url: "/v1/customer/book",
        method: "GET",
        params: {
            page: page,
            categoryId: categoryId,
            search: search,
            sortPrice: sort
        }
    }),
    getBook: (id: number) => request({
        url: `/v1/customer/book/${id}`,
        method: "GET"
    }),
    getBookRelations: (id: number) => request({
        url: `/v1/customer/book/${id}/relations?limit=10`,
        method: "GET"
    }),
    getCategoryParent: () => request({
        url: "/v1/customer/category/parent",
        method: "GET"
    }),
    };

    class Store {
        constructor(){
            makeAutoObservable(this)
        }

        @observable categories: any[] = [];
        @observable categoryHightlight: any[] = [];
        @observable books: any[] = [];
        @observable book: any = {};
        @observable bookRelations: any[] = [];
        @observable booksCount: number = 0;
        @observable isLoadingCategories: boolean = false;
        @observable isLoadingBooks: boolean = false;
        @observable page: number = 1;
        @observable key: string = "";
        @observable isLoadingMore:boolean = false;
        @observable categoryParent: any[] = [];
        @observable currentCategory: number = 0;
        @observable level: number = 0;
        @observable cate: any[] = [];
        @observable sort: string = "";


        @computed get getCategories(){
            return this.categories;
        }
        @computed get getCategoryHightlight(){
            return this.categoryHightlight;
        }
        @computed get getBooks(){
            return this.books;
        }
        @computed get getBook(){
            return this.book;
        }
        @computed get getBookRelations(){
            return this.bookRelations;
        }
        @computed get getBooksCount(){
            return this.booksCount;
        }
        @computed get getIsLoadingCategories(){
            return this.isLoadingCategories;
        }
        @computed get getIsLoadingBooks(){
            return this.isLoadingBooks;
        }
        @computed get getPage(){
            return this.page;
        }
        @computed get getIsLoadingMore(){
            return this.isLoadingMore;
        }
        @computed get getKey(){
            return this.key;
        }
        @computed get getCategoryParent(){
            return this.categoryParent;
        }
        @computed get getCurrentCategory(){
            return this.currentCategory;
        }
        @computed get getLevel(){
            return this.level;
        }
        @computed get getCateL1(){
            return this.cate;
        }
        @computed get getSort(){
            return this.sort;
        }


        @action 
         setCategories = async (categories: any[]) => {
            this.isLoadingCategories = true;
            await apiBook.getCategories().then(res => {
                this.categories = res.data.categories;})
                .catch(err => {
                    userStore.resetDataUser();
                }
            )
            this.isLoadingCategories = false;
        }
        @action
        setCategoryHightlight = async (categoryHightlight: any[]) => {
            const res = await apiBook.getCategoryHightlight();
            this.categoryHightlight = res.data;
        }
        @action
        setBooks = async (categoryId: number) => {
            this.isLoadingBooks = true;
            const res = await apiBook.getBooks(1,categoryId, this.key, this.sort);
            this.books = res.data.data;
            this.booksCount = res.data.total;
            this.isLoadingBooks = false;
        }
        @action
        setBook = async (id: number) => {
            const res = await apiBook.getBook(id);
            this.book = res.data;
        }
        @action
        setBookRelations = async (id: number) => {
            const res = await apiBook.getBookRelations(id);
            this.bookRelations = res.data.books;
        }
        @action
        loadMoreBooks = async (categoryId: number) => {
            this.isLoadingMore = true;
            if(this.books.length < this.booksCount){
            this.page += 1;
            const res = await apiBook.getBooks(this.page,categoryId, this.key, this.sort);
            this.books = [...this.books, ...res.data.data];
            }
            this.isLoadingMore = false;
        }
        @action
        setKey = (key: string) => {
            this.key = key;
        }
        @action
        setSort = (sort: string) => {
            this.sort = sort;
            this.setBooks(this.currentCategory);
        }
        @action
        setCategoryParent = async () => {
            const res = await apiBook.getCategoryParent();
            this.categoryParent = res.data;
        }
        @action
        setCurrentCategory = (id: number, level: number) => {
            this.currentCategory = id;
            this.level = level;
            this.cate[0]= {
                id: 0,
                name: "Tất cả",
                level: 0,
                children1: this.categoryParent
            }
            if(this.level === 1){
                this.cate[1] = this.categoryParent.find(item => item.id === id);
                this.cate[2] = {
                    id: 0,
                };
            }
            if(this.level === 2){
                this.cate[2] = this.cate[1].children1.find((item: { id: number; }) => item.id === id);
                this.cate[2].children1 = [];

            }
            if(this.level === 0){
              
                this.cate[1] = {
                    id: 0,
                };
                this.cate[2] = {
                    id: 0,
                };
            }
            this.setBooks(this.currentCategory);
        }

       

    }
    const bookStore = new Store();
    export default bookStore;


