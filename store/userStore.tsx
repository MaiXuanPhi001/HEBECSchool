import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable } from "mobx";
import { action, computed, observable,  } from "mobx";
import { Alert, NativeModules } from "react-native";
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
    register: (username: string, password: string, name: string) => request({
        url: "v1/customer/auth/signup",
        method: "POST",
        data: {
            username: username,
            password: password,
            name: name
        }
    }),

};

class Store{
    constructor(){
        makeAutoObservable(this)
}
@observable info: any[] = [];

@observable private _token = null;
@observable isLoading: boolean = false;

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
    await apiUser.login(username, password).then(async res => {
        this.setToken(res.data.token);
        this.getInfo();
    }
    ).catch(err => {
        Alert.alert("Đăng nhập thất bại", "Tên đăng nhập hoặc mật khẩu không đúng.");
    }
    );
}
@action
async getInfo(){
    this.isLoading = true;
    const res = await apiUser.getInfo();
    this.info = res.data;
    this.isLoading = false;
}
@action
async logout(){
    await apiUser.logout();
    this.resetDataUser();
}
@action
async updatePassword(password: string, newPassword: string){
    await apiUser.updatePassword(password, newPassword).then(res => {
        Alert.alert("Đổi mật khẩu thành công", "Tài khoản của bạn đã được cập nhật lại mật khẩu mới.");
        this.logout();
        this.resetDataUser();
    }
    ).catch(err => {
        Alert.alert("Đổi mật khẩu thất bại", "Mật khẩu cũ không đúng.");
    }
    );
   
}
@action
async resetDataUser(){
    await AsyncStorage.removeItem("token");
    this.setToken(null);
}
}
const userStore = new Store();
export default userStore;
