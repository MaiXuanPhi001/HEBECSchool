import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Animated, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HeaderName } from "../../components/HeaderWithName";
import { Loading } from "../../components/Loading";
import notiStore from "../../store/NotificationStore";
import { width } from "../../utils/dimensions";
import { NotificationItem } from "./components/NotiItem";

export const NotificationScreen = observer(({ navigation }: any) => {
    useEffect(() => {
        notiStore.setNotiList();
    }, [])
    
    return (
        <View style={{ flex: 1, backgroundColor:"#fff" }}>
        <HeaderName
            name="Thông báo"
            navigation={navigation}
            nonback={true}
        />
      
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
                    colors={["#489620"]}
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
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 16,
        color: "#489620",
        fontWeight: "bold",
        lineHeight: 24,
        marginTop: 20,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        color: "#231F20",
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
        backgroundColor: "#EEEEEE",
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    mark : {
        fontSize: 16,
        color: "#489620",
        alignSelf: "flex-end",
        marginBottom: 10
    }
});