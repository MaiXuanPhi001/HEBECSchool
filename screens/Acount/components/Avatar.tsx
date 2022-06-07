import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const Avatar = ({ data }: any) => {
    return (
        <View style={styles.container}>
            <Image source={{uri: 'https://163clone.bmdapp.store:4164'+data.avatar}} style={styles.image} />
            <Text style={styles.name}>{data.name}</Text>
            <Text style = {styles.info}>{data.classroom} MS: {+data.id}</Text>
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
        color: '#000',
        marginTop: 10,
    },
    info: {
        fontSize: 16,
        color: '#000',
        fontWeight: '400',
        marginTop: 5,
    },
});
