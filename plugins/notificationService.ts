import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import PushNotification, { PushNotification as PushNotificationType } from 'react-native-push-notification';
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
        this.subscribeOnMsg = firebase.messaging().onMessage((message) => {
            console.log('Remotemessage', message);
            if(typeof this._onReceive === 'function') {
                this._onReceive(message?.data)
            }
            console.log('this._isMessageForeGround', this._isMessageForeground);

            if(Platform.OS == 'ios' && this._isMessageForeground && typeof this._isMessageForeground =='boolean') {
                console.log('addNotificationRequest');
            }

            if(Platform.OS == 'android' && this._isMessageForeground && typeof this._isMessageForeground =='boolean') {
                PushNotification.presentLocalNotification({
                    title: message?.notification?.title,
                    message: message?.notification?.body,
                    soundName: 'default',
                    channelId: message.notification?.android?.channelId,
                    userInfo: message?.data,

            })
        }
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
                channelId: 'new-order',
                channelName: `new-order`,
                channelDescription: "new-order",
                soundName: 'default',
                importance: 4,
                vibrate: true,
            }, (created) => console.log('createChannel "New-Order"', created)
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

        