import request from "../utils/request";

export const newsApi = {
    getNews: (page:number) => request({
        url: "/v1/customer/news",
        method: "GET",
        params: {
            page: page,
            limit: 10,
        }
    }),
    getNewsDetail: (id:number) => request({
        url: `/v1/customer/news/${id}`,
        method: "GET",
    }),
}