import request from "../utils/request";

export const addressApi = {
    getCity: () => request({
        url: "/v1/customer/addressCity?page=1&limit=0",
        method: "GET",
    }),
    getDistrict: (parentCode: string) => request({
        url: `/v1/customer/addressDistrict?parentCode=${parentCode}`,
        method: "GET",
    }),
    getWard: (parentCode: string) => request({
        url: `/v1/customer/addressWard?parentCode=${parentCode}`,
        method: "GET",
    }),
}