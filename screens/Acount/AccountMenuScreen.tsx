import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native"
import userStore from "../../store/userStore";
import { AccountMenu, ContactMenu, SupportMenu, UnAuthMenu } from "../../types/Menu";
import { Avatar } from "./components/Avatar";
import { GroupMenu } from "./components/GroupMenu";

export const AcountScreen = observer(({navigation}: any) => {
    useEffect(() => {
      userStore.getInfo();
    }, [])
    
    return (
        <ScrollView style = {{flexGrow: 1, flex: 1}} >
             {userStore.token==null? null: <Avatar data = {userStore.info}/>}
             <View style = {styles.container}>
                <Text style = {styles.sectionName}>TÀI KHOẢN</Text>
                {userStore.token==null?  <GroupMenu navigation ={navigation} data = {UnAuthMenu}/>:<GroupMenu user ={userStore.info} navigation ={navigation} data = {AccountMenu}/>}
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
    });

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
