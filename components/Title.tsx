import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { BASE_URL } from "../config";
import { colors, sizes } from "../styles/themes";

export const Title = ({ title, icon }: any) => {
    return (
    <View style = {styles.title}>
        <Image style = {styles.icon} source = {{uri: BASE_URL+icon}}/>
        <Text style = {styles.text}>{title}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 20,
        marginBottom: 10,
        marginTop: 20,
    },
    text: {
        fontSize: sizes.size16,
        fontFamily: "text-bold",
        color: colors.darkGrey,
        marginLeft: 10,
    },
    icon: {
        width: 30,
        height: 30,
    }
});