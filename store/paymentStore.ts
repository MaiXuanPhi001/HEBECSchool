import AsyncStorage from "@react-native-async-storage/async-storage";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { addressApi } from "../api/address";

class Store{
    constructor(){
        makeAutoObservable(this)
}
@observable city = {
    code: "",
    name: "",
    feeDelivery: 0,
};
@observable district = {
    code: "",
    name: "",
    feeDelivery: 0,
};
@observable ward = {
    code: "",
    name: "",
    feeDelivery: 0,
};
@observable listCity = [];
@observable listDistrict = [];
@observable listWard = [];


    @computed get getCity(){
        return this.city;
    }
    @computed get getDistrict(){
        return this.district;
    }
    @computed get getWard(){
        return this.ward;
    }
    @computed get getListCity(){
        return this.listCity;
    }
    @computed get getListDistrict(){
        return this.listDistrict;
    }
    @computed get getListWard(){
        return this.listWard;
    }


    @action
    setCity = async (city: any) => {
        this.city = city;
        this.setListDistrict();
        this.setDistrict({
            code: "",
            name: "",
            feeDelivery: 0,
        });
        this.listWard = [];
        this.setWard({
            code: "",
            name: "",
            feeDelivery: 0,
        });
    }
    @action
    setDistrict = async (district: any) => {
        this.district = district;
        this.setListWard();
        this.setWard({
            code: "",
            name: "",
            feeDelivery: 0,
        });
    }
    @action
    setWard = async (ward: any) => {
        this.ward = ward;
    }
    @action
    setListCity = async () => {
       const res = await addressApi.getCity();
       this.listCity = res.data.data;
    }
    @action
    setListDistrict = async () => {
        const res = await addressApi.getDistrict(this.city.code);
        this.listDistrict = res.data.data;
    }
    @action
    setListWard = async () => {
         const res = await addressApi.getWard(this.district.code);
         this.listWard = res.data.data;
    }

}

const paymentStore = new Store();
export default paymentStore;