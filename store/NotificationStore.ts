import { action, computed, makeAutoObservable, observable } from "mobx";
import request from "../utils/request";

export const notiApi = {
    getNoti: (page:number) => request({
        url: "/v1/customer/notificationCustomer",
        method: "GET",
        params: {
            page: page,
            limit: 10,
        }
    }),
    seenNoti: (id:number) => request({
        url: `/v1/customer/notificationCustomer/${id}/seen`,
        method: "POST",
    }),
    seenAllNoti: () => request({
        url: `/v1/customer/notification/seen/all`,
        method: "POST",
    }),
}

class Store {
    constructor(){
        makeAutoObservable(this)
    }

    @observable notiList: any[] = [];
    @observable isLoadingNoti: boolean = false;
    @observable page: number = 1;
    @observable isLoadMore: boolean = false;
    @observable total: number = 0;

    @computed get getNotiList(){
        return this.notiList;
    }
    @computed get getIsLoadingNoti(){
        return this.isLoadingNoti;
    }
    @computed get getPage(){
        return this.page;
    }
    @computed get getIsLoadMore(){
        return this.isLoadMore;
    }
    @computed get getTotal(){
        return this.total;
    }


    @action setNotiList = async () => {
        this.setIsLoadingNoti(true);
        this.setPage(1);
        const res = await notiApi.getNoti(this.page);
        this.total = res.data.total;
        this.notiList = res.data.notificationCustomers;
       this.setIsLoadingNoti(false);
    }
    @action seenNoti = async (id: number) => {
        await notiApi.seenNoti(id).then(res => {
                this.setNotiList();
        }).catch(err => {
            console.log(err.response.data.message);
        }
        )
    }
    @action seenAllNoti = async () => {
        await notiApi.seenAllNoti().then(res => {
                this.setNotiList();
        }).catch(err => {
            console.log(err.response.data.message);
        }
        )
    }
    @action loadMoreNoti = async () => {
        this.setIsLoadMore(true);
        if(this.page < this.total/10){
        this.setPage(this.page + 1);
        const res = await notiApi.getNoti(this.page);
        this.notiList = this.notiList.concat(res.data.notificationCustomers);
        }
        this.setIsLoadMore(false);
    }
    @action setPage = (page: number) => {
        this.page = page;
    }
    @action setIsLoadMore = (isLoadMore: boolean) => {
        this.isLoadMore = isLoadMore;
    }
    @action setIsLoadingNoti = (isLoadingNoti: boolean) => {
        this.isLoadingNoti = isLoadingNoti;
    }
    @action setTotal = (total: number) => {
        this.total = total;
    }


}
const notiStore = new Store();
export default notiStore;