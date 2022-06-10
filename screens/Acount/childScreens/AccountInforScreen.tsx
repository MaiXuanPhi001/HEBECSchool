import React from "react"
import { Dimensions, Image, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native"
import { HeaderName } from "../../../components/HeaderWithName";
import { BASE_URL } from "../../../config";
import userStore from "../../../store/userStore";

let width = Dimensions.get('window').width;
let withCard = width - 40;


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
                colors={["#489620"]}
                progressBackgroundColor="#fff"
            />
            }>
            
                <View style = {styles.header}>
                    <Image style={{ width: 100, height: 100, borderRadius: 50, borderColor: '#9E9E9E', borderWidth: 3 }} source={data.avatar? {uri: BASE_URL+data.avatar}: require("../../../assets/Avartar.png")} />
                </View>
                <View style = {styles.body}>
                    <Text style = {styles.title}>THÔNG TIN CHUNG</Text>
                    <Column title = {'Họ & tên'} content = {data.name}/>
                    <Column title = {'Giới tính'} content = {data.gender}/>
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
        backgroundColor: '#fff',
        borderRadius: 10,
        height:490,
        marginHorizontal: 20,
        padding: 20,
        paddingTop: 70,
        display: 'flex',
        top: -50,
        flexDirection: 'column',
        width: withCard,
        shadowColor: "#000",
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
        left: withCard/2 - 50,
        borderRadius: 60,
        backgroundColor: '#f2f2f2',
        
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#489620',
    },
    info: {
        flexDirection: 'row',
        marginTop: 15,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#231F20',
        width: 130,
    },
    infoContent: {
        fontSize: 16,
        lineHeight: 20,
        width: withCard - 130,
        fontWeight: '500',
        color: '#231F20',
    },
    line: {
        borderBottomColor: '#9E9E9E',
        borderBottomWidth: 1,
        marginTop: 20,
        marginBottom: 20,
    }
})