import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable } from "mobx";
import { action, computed, observable,  } from "mobx";
import { CustomerType, ICustomer } from "../types/customer";
import request from "../utils/request";
export const apiUser = {
    login: (username: string, password: string) => request({
        url: "/v1/customer/auth/login",
        method: "POST",
        data: {
            username: username,
            password: password
        }
    }),
    logout: () => request({
        url: "/v1/customer/auth/logout",
        method: "POST"
    }),
    updatePassword: (password: string, newPassword: string) => request({
          url: "/v1/customer/auth/password/update",
          method: "POST",
            data: {
                oldPassword: password,
                newPassword: newPassword
            }
    }),
    getInfo: () => request({
        url: "/v1/customer/auth/profile",
        method: "GET"
    }),
};

export interface ITeacher {
    id: number,
    avatar: string,
    createdAt: number,
    updatedAt: number,
    email: string,
    username: string,
    province: string,
    address: string,
    name: string
  }

export interface IGrade {
    id: number,
    createdAt: number,
    updatedAt: number,
    name: string,
}


export interface IClassRoom {
    id: number,
    name: string,
    grade?: IGrade,
    code?: string,
    teacher?: ITeacher,
    school?: ISchool
  }

  export interface IAddressDistrict {
    nameWithType: string,
  }

  export interface ISchool {
    id?: number,
    name: string
    address: string,
    addressDistrict?: IAddressDistrict
    expiredAt: number
  }
  

export interface IUser {
    dateCreated?: number;
  dateUpdated?: number;
  id?: number;
  phone?: string;
  name?: string;
  phoneRelative?: string;
  address?: string;
  email?: string;
  gender?: string;
  avatar?: string;
  isBlock?: boolean;
  otp?: string;
  dob?: string;
  point?: number;
  totalPoint?: number;
  code?: string;
  pointAffiliate?: number;
  classroom?: IClassRoom,
  school?: ISchool,
  parentName?: string,
  parentPhone?: string,
  totalNotifyContact?: number,
  teacher?: [],
  isChangedDefaultPassword?: boolean
  type?: CustomerType
}

class Store{
    constructor(){
        makeAutoObservable(this)
}
@observable info: Partial<ICustomer> = {
    id: 0,
    phone: "",
    name: "",
    address: "",
    email: "",
    gender: "",
    avatar: "",
    code: "",
}
@observable private _token = null;

@computed get token(){
    return this._token;
}

@action
async setToken(token: any){
    this._token = token;
    await AsyncStorage.setItem("token", token);
}

@action
async login (username: string, password: string){
    const res = await apiUser.login(username, password);
    this.setToken(res.data.token);
    this.getInfo();
}
@action
async getInfo(){
            const res = await apiUser.getInfo();
            this.info = res.data;
            return true;
}
@action
async logout(){
    await apiUser.logout();
    this.resetDataUser();
}
@action
async updatePassword(password: string, newPassword: string){
    await apiUser.updatePassword(password, newPassword);
    await this.logout();
}
@action
async resetDataUser(){
    await AsyncStorage.removeItem("token");
    this.setToken(null);
}
}
const userStore = new Store();
export default userStore;
