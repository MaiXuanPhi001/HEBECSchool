import { action, computed, makeAutoObservable, observable } from "mobx";
import request from "../utils/request";

export const apiHistoryOrder = {
    getHistoryOrders: () => request({
        url: "/v1/customer/order",
        method: "GET",
    }),
    cancelOrder: (id: number) => request({
        url: `/v1/customer/order/${id}/cancel`,
        method: "POST"
    }),

}
class Store {
    constructor(){
        makeAutoObservable(this)
    }

    @observable historyOrders: any[] = [];
    @observable isLoadingHistoryOrders: boolean = false;
    @observable message: string = "";

    @computed get getHistoryOrders(){
        return this.historyOrders;
    }
    @computed get getIsLoadingHistoryOrders(){
        return this.isLoadingHistoryOrders;
    }
    @computed get getMessage(){
        return this.message;
    }
    @action setHistoryOrders = async () => {
        this.isLoadingHistoryOrders = true;
       const res = await apiHistoryOrder.getHistoryOrders();
         this.historyOrders = res.data.data;
            this.isLoadingHistoryOrders = false;
    }
    @action cancelOrder = async (id: number) => {
        this.setIsLoadingHistoryOrders(true);
        await apiHistoryOrder.cancelOrder(id).then(res => {
            if(res.data.status === true){
                this.setHistoryOrders();
            }
        }).catch(err => {
            this.setMessage(err.response.data.message);
            console.log(err.response.data.message);
        }
        )
        this.setIsLoadingHistoryOrders(false);
    }
    @action setMessage = (message: string) => {
        this.message = message;
    }
    @action setIsLoadingHistoryOrders = (isLoadingHistoryOrders: boolean) => {
        this.isLoadingHistoryOrders = isLoadingHistoryOrders;
    }
}
const historyOrdersStore = new Store();
export default historyOrdersStore;