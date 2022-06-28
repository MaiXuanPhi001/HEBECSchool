import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Animated, Button, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HeaderName } from "../../components/HeaderWithName";
import { Loading } from "../../components/Loading";
import notiStore from "../../store/NotificationStore";
import { width } from "../../utils/dimensions";
import { NotificationItem } from "./components/NotiItem";
import notifee from '@notifee/react-native';
import PushNotification from "react-native-push-notification";
import { NotificationService } from "../../plugins/notificationService";
import { colors } from "../../styles/themes";

export const NotificationScreen = observer(({ navigation }: any) => {
    useEffect(() => {
        notiStore.setNotiList();
    }, [])


    async function onDisplayNotification() {
        const notifyService = new NotificationService();
        PushNotification.presentLocalNotification({
            title:"TEST",
            message: "Thông báo nè",
            soundName: 'default',
            channelId: "new-order"
    })
    }

    return (
        <View style={{ flex: 1, backgroundColor:colors.white }}>
        <HeaderName
            name="Thông báo"
            navigation={navigation}
            nonback={true}
        />
       <View>
      {/* <Button title="Display Notification" onPress={() => onDisplayNotification()} /> */}
    </View>
        <View style={styles.container}>
        {notiStore.notiList.length ==0 ? 
            <View style={styles.emty}>
            <Image source={require("../../assets/icons/Noti.png")} />
            <Text style={styles.text}>
            Bạn chưa có thông báo nào
            </Text>
        </View>:
        <View>
        <FlatList
            data={notiStore.notiList}
            renderItem={({ item }) => <NotificationItem item={item} navigation={navigation} />}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            style={styles.list}
            onEndReached={() => {
                notiStore.loadMoreNoti();
            }}
            onEndReachedThreshold={0.5}
            refreshControl={
                <RefreshControl
                    refreshing={notiStore.isLoadingNoti}
                    onRefresh={() => notiStore.setNotiList()}
                    colors={[colors.primary]}
                />
            }
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() =>  
                                    <TouchableOpacity onPress={() => {
                                        notiStore.seenAllNoti();
                                    }}>
                                        <Text style={styles.mark}> Đánh dấu đã xem tất cả </Text>
                                    </TouchableOpacity>}
        />
        </View>
        }
        </View>
        {notiStore.getIsLoadMore ? <Loading large={true} style={styles.loading} /> : null}
        </View>
       
    );
    }
);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
    },
    title: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: "bold",
        lineHeight: 24,
        marginTop: 20,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        color: colors.darkGrey,
        marginLeft: 20,
        marginTop: 20,
    },
    emty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -50,
    },
    separator: {
        height: 1,
        backgroundColor: "colors.lightGrey",
        marginHorizontal: 20,
        marginVertical: 10,
    },
    list: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    loading: {
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 10,
        right: width / 2 - 25,
        zIndex: 1.5,
        borderRadius: 25,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.darkGrey,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    mark : {
        fontSize: 16,
        color: colors.primary,
        alignSelf: "flex-end",
        marginBottom: 10
    }
});