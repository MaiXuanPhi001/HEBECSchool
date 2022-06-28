import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import PushNotification from "react-native-push-notification";
import notifee from '@notifee/react-native';
export class NotificationService {

    private lastId: number
    private lastChannelCounter: number
    private _onReceive : any
    private _onReceiveBackground: any
    private subscribeOnMsg: any
    private _onNotificationLocalClick: any
    private subscribeOnClick: any
  _isMessageForeground
  constructor(_isMessageForeground?: boolean) {
    this._isMessageForeground = _isMessageForeground
    this.lastId = 0
    this.lastChannelCounter = 0
    this.createChanel()
    console.log("isMessageForeground", this._isMessageForeground);
    PushNotification.getChannels(function (channels) {
        console.log('channel ready', channels);
    });
    this.init()
  }
    static async setFcmToken(token: string) {
        await AsyncStorage.setItem('fcmToken', token)
    }
    static async checkPermission() {
       const permission = await firebase.messaging().hasPermission();
       console.log('permission', permission);
       if(permission== firebase.messaging.AuthorizationStatus.NOT_DETERMINED || permission == firebase.messaging.AuthorizationStatus.DENIED) {
              await firebase.messaging().requestPermission();
           
       }
    }
    unSubscribe() {
        this.subscribeOnMsg?.()
        this._onNotificationLocalClick == null;
    }
    
    init() {
        this.subscribeOnMsg = firebase.messaging().onMessage(async (remoteMessage) => {
            console.log('Remotemessage', remoteMessage);
            if(typeof this._onReceive === 'function') {
                this._onReceive(remoteMessage?.data)
            }
            console.log('this._isMessageForeGround', this._isMessageForeground);

            if(Platform.OS == 'ios' && this._isMessageForeground && typeof this._isMessageForeground =='boolean') {
                console.log('addNotificationRequest');
            }

            if(Platform.OS == 'android' && this._isMessageForeground && typeof this._isMessageForeground =='boolean') {
                PushNotification.presentLocalNotification({
                    title: remoteMessage.notification?.title,
                    message: (remoteMessage.notification?.body)? remoteMessage.notification?.body: "",
                    soundName: 'default',
                    channelId: remoteMessage.notification?.android?.channelId,
                    userInfo: remoteMessage.data,

            })
        }

        // const channelId = await notifee.createChannel({
        //     id: 'default',
        //     name: 'Default Channel',
        //   });
      
        //   // Display a notification
        //   await notifee.displayNotification({
        //     title: 'Thông báo',
        //     body: 'Thông báo test',
        //     android: {
        //       channelId,
        //       smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        //     },
        //   });
    });

        Platform.OS == 'android' && firebase.messaging().setBackgroundMessageHandler(async (message) => {
            console.log('background message', message?.data);
            if(typeof this._onReceiveBackground === 'function') {
                this._onReceiveBackground(message?.data, true)
            }
        });
    }

    

        onLastNotification(cb: any) {
            firebase.messaging().getInitialNotification().then(message => {
                console.log('onLastNotification', message?.data);
                if(typeof cb === 'function') {
                   cb(message?.data, true)
                }
            });
        }

    static async getFcmToken() {
        const token = await AsyncStorage.getItem('fcmToken')
        return token
    }

    static setBadge(count = 0) {
        PushNotification.setApplicationIconBadgeNumber(count)
    }

    onNotification (cb: any) {
        this._onReceive = cb
    }

    onNotificationLocalClick (cb: any) {
        this._onNotificationLocalClick = cb
        if(Platform.OS == 'android') {
          PushNotification.configure({
            onNotification: (notification) => {
                if(notification.userInteraction){
                    this._onNotificationLocalClick(notification.data, true)
                }
        }
        });
    }
    }

    onNotificationClick (cb: any) {
        this.subscribeOnClick = firebase.messaging().onNotificationOpenedApp(message => {
            cb(message?.data, true)
        })
    }

    static onRegister = async (cb?: (fcmToken:string)=> void) => {
        const fcmToken = await firebase.messaging().getToken()
        cb?.(fcmToken)
        await NotificationService.setFcmToken(fcmToken)
    }

    onNotificationBackground (cb: any) {
        this._onReceiveBackground = cb
    }

    createChanel() {
        PushNotification.createChannel(
            {
                channelId: 'ORDER',
                channelName: `order`,
                channelDescription: "order",
                soundName: 'default',
                importance: 4,
                vibrate: true,
            }, (created) => console.log('createChannel "Order"', created)
        );
        PushNotification.createChannel(
            {
                channelId: 'NEWS',
                channelName: `news`,
                channelDescription: "news",
                soundName: 'default',
                importance: 4,
                vibrate: true,
            }, (created) => console.log('createChannel "News"', created)
        );
        PushNotification.createChannel(
            {
                channelId: 'NOTIFICATION',
                channelName: `notification`,
                channelDescription: "notification",
                soundName: 'default',
                importance: 4,
                vibrate: true,
            }, (created) => console.log('createChannel "Notification"', created)
        );
        PushNotification.createChannel(
            {
                channelId:"default",
                channelName: `Default chanel`,
                channelDescription: "A Default chanel",
                soundName: 'default',
                importance: 4,
                vibrate: true,
            }, (created) => console.log('createChannel "Default"', created)
        );
    }
}
export const lastNotificationService = new NotificationService(true)

        