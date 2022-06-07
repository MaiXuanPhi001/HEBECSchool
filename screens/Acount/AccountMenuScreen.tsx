import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { AuthContext } from "../../types/Context";
import { AccountMenu, ContactMenu, SupportMenu, UnAuthMenu } from "../../types/Menu";
import { Avatar } from "./components/Avatar";
import { GroupMenu } from "./components/GroupMenu";

export const AcountScreen = ({navigation}: any) => {
    const [auth, setauth] = useContext(AuthContext);
    const [user, setUser] = useState([]);
    useEffect(() => {
        fechtBanner();
    }, [])
    
    async function fechtBanner() {
        axios('https://163clone.bmdapp.store:4164/v1/customer/auth/profile', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                token: auth,
            },
        })
        .then((response) => {setUser(response.data.data);})
        .catch(() => {
            console.log('error');
        });
    }
    return (
        <ScrollView style = {{flexGrow: 1, flex: 1}} >
             {auth==''? null: <Avatar data = {user}/>}
             <View style = {styles.container}>
                <Text style = {styles.sectionName}>TÀI KHOẢN</Text>
                {auth==''?  <GroupMenu navigation ={navigation} data = {UnAuthMenu}/>:<GroupMenu user ={user} navigation ={navigation} data = {AccountMenu}/>}
            </View>
            <View style = {styles.container}>
                <Text style = {styles.sectionName}>HỖ TRỢ</Text>
                <GroupMenu navigation ={navigation} data = {SupportMenu}/>
            </View>
            <View style = {styles.container}>
                <Text style = {styles.sectionName}>LIÊN HỆ</Text>
                <GroupMenu navigation ={navigation} data = {ContactMenu} notice = {2}/>
            </View>
        </ScrollView>
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionName: {
        fontSize: 16,
        fontWeight: "500",
        marginHorizontal: 20,
        marginVertical: 10,
    },
});
