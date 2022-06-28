import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { BASE_URL } from "../../../config";
import * as Updates from 'expo-updates';
import appJSON from '../../../app.json'
import { colors, sizes } from "../../../styles/themes";

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
        borderColor: colors.mediumGrey,
        marginTop: 20,
    },
    name: {
        fontSize: 20,
        fontFamily: "text-bold",
        color: colors.darkGrey,
        marginTop: 10,
    },
    info: {
        fontSize: sizes.size16,
        color: colors.darkGrey,
        fontFamily: "text-regular",
        marginTop: 5,
    },
    info2: {
        fontSize: 10,
        color: colors.darkGrey,
        fontFamily: "text-regular",
        marginTop: 5,
    },
});
