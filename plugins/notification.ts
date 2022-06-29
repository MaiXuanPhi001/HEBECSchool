import historyOrdersStore from "../store/HistoryStore"
import newsStore from "../store/newsStore";
import notiStore from "../store/NotificationStore";
import userStore from "../store/userStore";
import { Navigation } from "../utils/navigation";

const handleOrderNotification =async ( trigger: any) => {
    if(trigger){
        await historyOrdersStore.setHistoryOrders();
        Navigation.navigate("HistoryOrders");
    }
    
}

const handleNewsNotification =async ( data:any,trigger: any) => {
    if(trigger){
       newsStore.setNewsList();
       notiStore.seenNoti(data.notificationId);
         Navigation.navigate("News",{
            id: data.newsId
         });
    }
}

const handleNotification = async ( data:any,trigger: any) => {
    if(trigger){
        Navigation.navigate("Notification");
    }
}

export const switchNotification = async (data: any, trigger: any) => {
    userStore.getInfo();
    notiStore.setNotiList();
    try{
    if(data.type === "ORDER"){
        handleOrderNotification(trigger);
    }else if(data.type === "NEWS"){
        handleNewsNotification(data,trigger);
    }
    else{
        handleNotification(data,trigger);
    }
    }catch(err){
        console.log(err);
    }
}