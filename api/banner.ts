import request from "../utils/request";

export const bannerApi = {
    getBanner: () => request({
        url: "/v1/customer/banner",
        method: "GET",
    }),
}