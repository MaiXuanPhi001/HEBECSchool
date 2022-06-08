import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import { BASE_URL } from "../config";

const service = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

service.interceptors.request.use(
    async config => {
        let token: string|null = await AsyncStorage.getItem("token");
        if (token) {
            config.headers = {
                ...config.headers,
                "token": token
            };
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        const res = response.data;
        if (response.status !== 200) {
           Alert.alert("Lỗi!", res.message);
           return Promise.reject(new Error(res.message||"Lỗi không xác định"));
        } else {
            return res;
        }
    },
    error => {
        return Promise.reject(error);
    }
);
export default service;
