import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { AuthContext } from "../../types/Context";
import { AccountMenu, ContactMenu, SupportMenu, UnAuthMenu } from "../../types/Menu";
import { Avatar } from "./components/Avatar";
import { GroupMenu } from "./components/GroupMenu";

export const AcountScreen = ({navigation}: any) => {
    const [auth, setauth] = useContext(AuthContext);
    const [data, setData] = useState({
        name: "Nguyễn Văn A",
        class: "12A1",
        id: "02",
        image: "https://i.pinimg.com/originals/8d/46/5a/8d465aadf92d37e6c9da414a4ce3e1e9.jpg",
    });
    return (
        <ScrollView style = {{flexGrow: 1, flex: 1}} >
             {auth==''? null: <Avatar data = {data}/>}
             <View style = {styles.container}>
                <Text style = {styles.sectionName}>TÀI KHOẢN</Text>
                {auth==''?  <GroupMenu navigation ={navigation} data = {UnAuthMenu}/>:<GroupMenu navigation ={navigation} data = {AccountMenu}/>}
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
