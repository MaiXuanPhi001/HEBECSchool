import React from "react"
import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native"
import { HeaderName } from "../../../components/HeaderWithName";
import { BASE_URL } from "../../../config";
import userStore from "../../../store/userStore";
import { colors, sizes } from "../../../styles/themes";
import { width } from "../../../utils/dimensions";


export const AccountInforScreen = ({ navigation, route }: any) => {
    const {data} = route.params;
    return (
        <View style={{ flex: 1}}>
            <HeaderName name = {'Thông tin cá nhân'} navigation = {navigation}/>
            <ScrollView style={{ flex: 1, marginTop: 20 }}
            refreshControl={
                <RefreshControl
                refreshing={userStore.isLoading}
                onRefresh={() => {
                    userStore.getInfo();
                }
                }
                colors={[colors.primary]}
                progressBackgroundColor={colors.white}
            />
            }>
            
                <View style = {styles.header}>
                    <Image style={{ width: 100, height: 100, borderRadius: 50, borderColor: colors.mediumGrey, borderWidth: 3 }} source={data.avatar? {uri: BASE_URL+data.avatar}: require("../../../assets/Avartar.png")} />
                </View>
                <View style = {styles.body}>
                    <Text style = {styles.title}>THÔNG TIN CHUNG</Text>
                    <Column title = {'Họ & tên'} content = {data.name}/>
                    <Column title = {'Giới tính'} content = {data.gender=="MALE"?"Nam":"Nữ"}/>
                    <Column title = {'Ngày sinh'} content = {data.dob}/>
                    <Column title = {'Lớp'} content = {data.classroom}/>
                    <Column title = {'Mã số'} content = {data.id}/>
                    <View style = {styles.line}/>
                    <Text style = {styles.title}>THÔNG TIN KHÁC</Text>
                    <Column title = {'Địa chỉ'} content = {data.address !=''? data.address:null}/>
                    <Column title = {'Số điện thoại'} content = {data.phone}/>
                </View>
            </ScrollView>
        </View>
    )
}
const Column = ({title, content}: any) => {
    return (
        <View style = {styles.info}>
            <Text style = {styles.infoTitle}>{title}</Text>
            <Text numberOfLines={2} style = {styles.infoContent}>{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        backgroundColor: colors.white,
        borderRadius: 10,
        height:490,
        marginHorizontal: 20,
        padding: 20,
        paddingTop: 70,
        display: 'flex',
        top: -50,
        flexDirection: 'column',
        width: width-40,
        shadowColor: colors.darkGrey,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        height: 120,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1.5,
        left: width/2 - 60,
        borderRadius: 60,
        backgroundColor: '#f2f2f2',
        
    },
    title: {
        fontSize: sizes.size18,
        fontFamily: "text-bold",
        color: colors.primary,
    },
    info: {
        flexDirection: 'row',
        marginTop: 15,
    },
    infoTitle: {
        fontSize: sizes.size16,
        fontFamily: "text-regular",
        color: colors.darkGrey,
        width: 130,
    },
    infoContent: {
        fontSize: sizes.size16,
        lineHeight: 20,
        width: width - 190,
        fontFamily: "text-medium",
        color: colors.darkGrey,
    },
    line: {
        borderBottomColor: colors.mediumGrey,
        borderBottomWidth: 1,
        marginTop: 20,
        marginBottom: 20,
    }
})