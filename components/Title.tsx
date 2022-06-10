import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { BASE_URL } from "../config";

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
        fontSize: 16,
        fontWeight: '700',
        color: '#231F20',
        marginLeft: 10,
    },
    icon: {
        width: 20,
        height: 20,
    }
});