
import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import userStore from "../../../store/userStore";

export const Item = ({user,data, notice, navigation}: any) => {
    return(
    <TouchableOpacity 
    onPress={() => {
        switch(data.id){
            case 2:
                navigation.navigate('AccountInfor', {
                    data: user,
                });
                break;
            case 3:
                navigation.navigate('ChangePassword');
                break;
            case 5:
                userStore.logout();
                break;

            default:
                break;
        }
    }}

    style={styles.item}>
        <View style={styles.start}>
            <Image style = {styles.icon} source={data.icon}/>
            <Text style={data.id != 14? styles.title : styles.titleLogin}>{data.title}</Text>
        </View>
        {data.arrow?  <Image source={require("../../../assets/icons/ArrowIcon.png")}/> : null}
        {(notice != null && data.id ==10)?  <View style = {styles.notice}>
            <Text style = {styles.noticeText}>{notice}</Text>
            </View> : null}
    </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    start: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        maxHeight: 100,
        flexWrap: 'wrap',
    },
    titleLogin: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        maxHeight: 100,
        flexWrap: 'wrap',
        color: '#489620',
    },
    icon: {
        marginRight: 10,
        width: 25,
        height: 25,
        },
    notice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F44336',
        width: 30,
        height: 21,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    noticeText: {
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'center',
        color: '#fff',
    },

    });