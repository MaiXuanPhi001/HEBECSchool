import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { BASE_URL } from "../../../config";
import * as Updates from 'expo-updates';
import appJSON from '../../../app.json'

export const Avatar = ({ data }: any) => {

    //get versionCode of app from app.jso
    console.log(appJSON.expo.version);
    return (
        <View style={styles.container}>
            <Image source={data.avatar? {uri: BASE_URL+data.avatar}: require("../../../assets/Avartar.png")} style={styles.image} />
            <Text style={styles.name}>{data.name}</Text>
            <Text style = {styles.info}>{data.classroom} MS: {+data.id}</Text>
            <Text style = {styles.info2}>{appJSON.expo.version} </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignSelf: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    image: {
        borderRadius: 100,
        overflow: 'hidden',
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: "#9E9E9E",
        marginTop: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.darkGrey,
        marginTop: 10,
    },
    info: {
        fontSize: 16,
        color: colors.darkGrey,
        fontWeight: '400',
        marginTop: 5,
    },
    info2: {
        fontSize: 10,
        color: colors.darkGrey,
        fontWeight: '400',
        marginTop: 5,
    },
});
