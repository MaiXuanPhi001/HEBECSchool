import historyOrdersStore from "../store/HistoryStore"
import newsStore from "../store/newsStore";
import notiStore from "../store/NotificationStore";
import userStore from "../store/userStore";

const handleOrderNotification =async ( data: any,trigger: any, navigation: any) => {
    if(trigger){
        await historyOrdersStore.setHistoryOrders();
        navigation.navigate("History");
    }
    
}

const handleNewsNotification =async ( data:any,trigger: any,navigation: any) => {
    if(trigger){
       newsStore.setNewsList();
       notiStore.seenNoti(data.notificationId);
         navigation.navigate("News",{
            id: data.newsId
         });
    }
}

const handleNotification = async ( data:any,trigger: any,navigation: any) => {
    if(trigger){
        navigation.navigate('NotiDetail',{
            title:data.title,
            body: data.content,
        })
    }
}

export const switchNotification = async (data: any, trigger: any, navigation: any) => {
    userStore.getInfo();
    notiStore.setNotiList();
    try{
    if(data.type === "ORDER"){
        handleOrderNotification(data,trigger, navigation);
    }else if(data.type === "NEWS"){
        handleNewsNotification(data,trigger, navigation);
    }
    else{
        handleNotification(data,trigger, navigation);
    }
    }catch(err){
        console.log(err);
    }
}