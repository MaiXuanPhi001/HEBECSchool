import AsyncStorage from "@react-native-async-storage/async-storage";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { addressApi } from "../api/address";
import request from "../utils/request";
import cartStore from "./cartStore";


export const apiOrder = {
    getEstimate:  (promotionCode: string, cityId:number, districtId:number, wardId:number, detail:{}[]) => request({
        url: "/v1/customer/order/estimate",
        method: "POST",
        data: {
            order : {},
            promotionCode: promotionCode,
            addressCityId: cityId,
            addressDistrictId: districtId,
            addressWardId: wardId,
            details: detail
    }
    }),
    createOrder: (order: any) => request({
        url: "/v1/customer/order",
        method: "POST",
        data: order
    }),
}



class Store{
    constructor(){
        makeAutoObservable(this)
}
@observable step = 1;
@observable name = "";
@observable phone = "";
@observable address = "";
@observable city = {
    code: "",
    name: "",
    feeDelivery: 0,
    id: 0
};
@observable district = {
    code: "",
    name: "",
    feeDelivery: 0,
    id: 0
};
@observable ward = {
    code: "",
    name: "",
    feeDelivery: 0,
    id: 0
};
@observable listCity = [];
@observable listDistrict = [];
@observable listWard = [];
@observable orderEstimate:any = {};
@observable detail = [{
    quantity: 0,
    bookId: 0,
    attributeId1: 0,
    attributeId2: 0
}]
@observable order: any = {}
@observable promotionFail: boolean = false;
@observable isLoadingPromo: boolean = false;
@observable promotionCode: string = "";
@observable note = "";
@observable paymentType = "CASH";
@observable success = true;
@observable message: string = "";
@observable isLoadingOrder: boolean = false;

    @computed get getStep(){
        return this.step;
    }
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
    @computed get getName(){
        return this.name;
    }
    @computed get getPhone(){
        return this.phone;
    }
    @computed get getAddress(){
        return this.address;
    }
    @computed get getOrderEstimate(){
        return this.orderEstimate;
    }
    @computed get getOrder(){
        return this.order;
    }
    @computed get getPromotionFail(){
        return this.promotionFail;
    }
    @computed get getIsLoadingPromo(){
        return this.isLoadingPromo;
    }
    @computed get getPromotionCode(){
        return this.promotionCode;
    }
    @computed get getNote(){
        return this.note;
    }
    @computed get getPaymentType(){
        return this.paymentType;
    }
    @computed get getSuccess(){
        return this.success;
    }
    @computed get getMessage(){
        return this.message;
    }
    @computed get getIsLoadingOrder(){
        return this.isLoadingOrder;
    }


    @action
    setCity = async (city: any) => {
        this.city = city;
        this.setListDistrict();
        this.setDistrict({
            code: "",
            name: "",
            feeDelivery: 0,
            id: 0
        });
        this.listWard = [];
        this.setWard({
            code: "",
            name: "",
            feeDelivery: 0,
            id: 0
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
            id: 0
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
    @action
    setName = async (name: string) => {
        this.name = name;
    }
    @action
    setPhone = async (phone: string) => {
        this.phone = phone;
    }
    @action
    setAddress = async (address: string) => {
        this.address = address;
    }
    @action
    setData = async (data: any) => {
        this.name = data.name;
        this.phone = data.phone;
        this.address = data.address;
        this.setCity(data.city);
        this.setDistrict(data.district);
        this.setWard(data.ward);
        this.promotionCode = data.promotionCode;
        this.note = data.note;
        this.paymentType = data.paymentType;
    }
    @action
    setDataFromStorage = async () => {
        const data = await AsyncStorage.getItem("payment");
        if(data){
            const json = JSON.parse(data);
            this.setData(json);
        }
        this.setMessage("");
        this.setPromotionFail(false);
    }
    @action
    saveData = async () => {
        const data = {
            name: this.name,
            phone: this.phone,
            address: this.address,
            city: this.city,
            district: this.district,
            ward: this.ward,
            promotionCode: this.promotionCode,
            note: this.note,
            paymentType: this.paymentType
        };
        await AsyncStorage.setItem("payment", JSON.stringify(data));
    }
    @action
    clearData = async () => {
        this.name = "";
        this.phone = "";
        this.address = "";
        this.city = {
            code: "",
            name: "",
            feeDelivery: 0,
            id: 0
        };
        this.district = {
            code: "",
            name: "",
            feeDelivery: 0,
            id: 0
        };
        this.ward = {
            code: "",
            name: "",
            feeDelivery: 0,
            id: 0
        };
        this.listCity = [];
        this.listDistrict = [];
        this.listWard = [];
        await AsyncStorage.removeItem("payment");
    }
        @action setStep = async (step: number) => {
            this.step = step;
        }
        @action setOrderEstimate = async () => {
            this.setIsLoadingPromo(true);
            const cart = cartStore.getCart;
             this.detail = cart.map((item: any) => {
                return {
                    quantity: item.quantity,
                    bookId: item.book.id,
                    attributeId1: 0,
                    attributeId2: 0
                }
            }
            );
            await apiOrder.getEstimate(this.promotionCode, this.city.id, this.district.id, this.ward.id, this.detail).then(res => {
                this.orderEstimate = res.data
                this.setPromotionFail(false);
            }
            ).catch(async err => {
                console.log(err.response.data.message);
                this.orderEstimate.moneyDiscount = 0;
                this.setPromotionFail(true);
                this.setMessage(err.response.data.message);
                this.setPromotionCode("");
                this.orderEstimate = await (await apiOrder.getEstimate(this.promotionCode, this.city.id, this.district.id, this.ward.id, this.detail)).data;
               
            }
            );
            this.setIsLoadingPromo(false);
        }
        @action setPromotionFail = async (promotion: boolean) => {
            this.promotionFail = promotion;
        }
        @action setIsLoadingPromo = async (promotion: boolean) => {
            this.isLoadingPromo = promotion;
        }
       @action setPromotionCode = async (promotionCode: string) => {
              this.promotionCode = promotionCode;
              this.saveData();
         }
        @action setNote = async (note: string) => {
            this.note = note;
            this.saveData();
        }
        @action setOrder = async () => {
            this.setMessage("");
            this.setIsLoadingOrder(true);
            this.order = {
                order: {
                    name: this.name,
                    phone: this.phone,
                    address: this.address,
                    note: this.note,
                    isDeleted: false,
                    paymentType: this.paymentType,
                },
                promotionCode: this.promotionCode,
                addressCityId: this.city.id,
                addressDistrictId: this.district.id,
                addressWardId: this.ward.id,
                details: this.detail
            }
            await apiOrder.createOrder(this.order).then(res => {
                console.log(res);
               this.setSuccess(true);
               if(cartStore.isBuyNow == false)
               {
                cartStore.clearCart();
               }
               else{
                cartStore.getCartFromStore();
               }
               
            }
            ).catch(err => {
                this.setSuccess(false);
                this.setMessage(err.response.data.message);
            }
            );
            this.setIsLoadingOrder(false);
        }
        @action setPaymentType = async (paymentType: string) => {
            this.paymentType = paymentType;
            this.saveData();
        }
        @action setSuccess = async (success: boolean) => {
            this.success = success;
        }
        @action setMessage = async (message: string) => {
            this.message = message;
        }
        @action setIsLoadingOrder = async (isLoading: boolean) => {
            this.isLoadingOrder = isLoading;
        }



}

const paymentStore = new Store();
export default paymentStore;