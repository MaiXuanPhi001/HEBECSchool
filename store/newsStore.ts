import { action, computed, makeAutoObservable, observable } from "mobx";
import { newsApi } from "../api/news";

class Store{
    constructor(){
        makeAutoObservable(this)
    }

    @observable newsList: any[] = [];
    @observable isLoadingNews: boolean = false;
    @observable message: string = "";
    @observable isLoadingMoreNews: boolean = false;
    @observable page: number = 1;
    @observable news: any = {};
    @observable isLoadingNewsDetail: boolean = false;
    @observable total: number = 0;

    @computed get getNewsList(){
        return this.newsList;
    }
    @computed get getIsLoadingNews(){
        return this.isLoadingNews;
    }
    @computed get getMessage(){
        return this.message;
    }
    @computed get getIsLoadingMoreNews(){
        return this.isLoadingMoreNews;
    }
    @computed get getPage(){
        return this.page;
    }
    @computed get getNews(){
        return this.news;
    }
    @computed get getIsLoadingNewsDetail(){
        return this.isLoadingNewsDetail;
    }
    @computed get getTotal(){
        return this.total;
    }


    @action setNewsList = async () => {
        this.isLoadingNews = true;
        this.setPage(1);
        const res = await newsApi.getNews(this.page);
        this.newsList = res.data.data;
        this.total = res.data.total;
        this.isLoadingNews = false;
    }
    @action setNews = async (id: number) => {
        this.isLoadingNewsDetail = true;
        const res = await newsApi.getNewsDetail(id);
        this.news = res.data;
        this.isLoadingNewsDetail = false;
    }
    @action setIsLoadingNews = (isLoadingNews: boolean) => {
        this.isLoadingNews = isLoadingNews;
    }
    @action setMessage = (message: string) => {
        this.message = message;
    }
    @action setIsLoadingMoreNews = (isLoadingMoreNews: boolean) => {
        this.isLoadingMoreNews = isLoadingMoreNews;
    }
    @action setPage = (page: number) => {
        this.page = page;
    }
    @action loadMoreNewsList = async () => {
        this.setIsLoadingMoreNews(true);
        if(this.page < this.total/10){
        this.setPage(this.page + 1);
        const res = await newsApi.getNews(this.page);
        this.newsList = this.newsList.concat(res.data.data);
        }
        this.setIsLoadingMoreNews(false);
       

    }
    
}
const newsStore = new Store();
export default newsStore;