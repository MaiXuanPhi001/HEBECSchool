import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export const Title = ({ title, icon, subTitle }: any) => {
    return (
        <View style = {styles.title}>
        <Text style = {styles.more}>{subTitle}</Text>
        <Image style = {styles.icon} source = {icon}/>
        <Text style = {styles.text}>{title}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 20,
        marginBottom: 10,
        marginTop: 40,
    },
    text: {
        position: 'absolute',
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        left: 30,
    },
    more: {
        position: 'absolute',
        fontWeight: '500',
        fontSize: 16,
        color: '#489620',
        left: 300,
    },
    icon: {
        position: 'absolute',
        width: 20,
        height: 20,
        marginRight: 10,
    },
});