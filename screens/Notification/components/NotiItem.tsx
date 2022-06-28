import { observer } from "mobx-react";
import React from "react"; 
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import notiStore from "../../../store/NotificationStore";
import { colors, sizes } from "../../../styles/themes";
import { convertDate } from "../../../types/DateTime";
import { width } from "../../../utils/dimensions";

export const NotificationItem = observer(({navigation,item}:any) => {
    return (
        <TouchableOpacity
        onPress={() => {
            if(item.type == 'ORDER'){
                navigation.navigate("History")
                item.isSeen? null:notiStore.seenNoti(item.id)
            }
            if(item.type == 'NEWS'){
                navigation.navigate('News',{
                    id: item.news.id,
                  })
                item.isSeen? null:notiStore.seenNoti(item.id)
            }

        }}

        style = {styles.container}>
            <View style = {styles.left}>
                <Image
                    source = {require("../../../assets/icons/Noti.png")}
                    style = {item.isSeen?styles.imgSeened:styles.imgUnseen}
                />
            </View>
            <View style = {styles.right}>
                <Text style = {item.isSeen? styles.titleSeened :styles.title}>{item.title}</Text>
                <Text
                numberOfLines={2}
                style = {item.isSeen?styles.contentSeened: styles.content}>{item.content}</Text>
                <Text style = {styles.time}>{convertDate(item.createdAt)}</Text>
            </View>
        </TouchableOpacity>
    );
}
);
const styles = StyleSheet.create({
    item: {
        backgroundColor: colors.white,
        flex: 1,
    },
   
    container: {
        flexDirection: "row",
        marginHorizontal: 20,
        height: 85,
    },
    left: {
        flexDirection: "row",
        width: 40,
        alignItems: "flex-end",
    },
    right: {
        marginLeft: 10,
        alignItems: "flex-start",
        flexDirection: "column",
        width: width - 90,
    },
    title: {
        fontSize: sizes.size16,
        color: colors.darkGrey,
        fontFamily: "text-medium",
    },
    titleSeened: {
        fontSize: sizes.size16,
        color: colors.mediumGrey,
        fontFamily: "text-regular",
    },
    content: {
         fontSize: sizes.size14,
        color: colors.darkGrey,
        marginVertical: 5,
    },
    contentSeened: {
         fontSize: sizes.size14,
        color: colors.mediumGrey,
        marginVertical: 5,
    },
    time: {
        fontSize: sizes.size12,
        color: colors.mediumGrey,
    },
    imgSeened: {
        width: 40,
        resizeMode: "contain",
        top: -10
    },
    imgUnseen: {
        width: 40,
        tintColor: colors.primary,
        resizeMode: "contain",
        top: -10
    },
});
