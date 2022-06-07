import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export const Title = ({ title, icon, subTitle }: any) => {
    return (
        <View style = {styles.title}>
        <TouchableOpacity style = {{position: 'absolute', left: 300}}>
        <Text style = {styles.more}>{subTitle}</Text>
        </TouchableOpacity>
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
        color: '#231F20',
        left: 30,
    },
    more: {
        fontWeight: '500',
        fontSize: 16,
        color: '#489620',
    },
    icon: {
        position: 'absolute',
        width: 20,
        height: 20,
        marginRight: 10,
    },
});