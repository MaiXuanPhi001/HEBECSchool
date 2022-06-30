
import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AlertCustom } from "../../../components/Alert";
import userStore from "../../../store/userStore";
import { colors, sizes } from "../../../styles/themes";

export const Item = ({user,data, notice, navigation}: any) => {
    const [showAlert, setShowAlert] = React.useState(false);

    const onConfirm = (confirm: any) => {
        if (confirm === true) {
           userStore.logout();
        }
        setShowAlert(false)
    }
    return(
    <View>
    <TouchableOpacity 
    onPress={() => {
        switch(data.id){
            case 1:
                navigation.navigate("History");
                break;
            case 2:
                navigation.navigate('AccountInfor', {
                    data: user,
                });
                break;
            case 3:
                navigation.navigate('ChangePassword');
                break;
            case 5:
               setShowAlert(true);
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
        {data.arrow?  <Image style = {{width:20, height: 20}} source={require("../../../assets/icons/ArrowIcon.png")}/> : null}
        {(notice != null && data.id ==10)?  <View style = {styles.notice}>
            <Text style = {styles.noticeText}>{notice}</Text>
            </View> : null}
    </TouchableOpacity>
    {showAlert && <AlertCustom 
            title = "Đăng xuất" 
            message = "Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này?" 
            callback = {onConfirm}
            visible = {showAlert} 
            cancelText = {"Huỷ"}
            confirmText = {"Đăng xuất"}/>}
    </View>
    
    )
};
const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
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
        fontSize: sizes.size16,
        fontFamily: "text-regular",
        textAlign: 'center',
        maxHeight: 100,
        flexWrap: 'wrap',
    },
    titleLogin: {
        fontSize: sizes.size16,
        fontFamily: "text-regular",
        textAlign: 'center',
        maxHeight: 100,
        flexWrap: 'wrap',
        color: colors.primary,
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
        backgroundColor: colors.error,
        width: 30,
        height: 21,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    noticeText: {
        fontSize: sizes.size12,
        fontFamily: "text-regular",
        textAlign: 'center',
        color: colors.white,
    },

    });