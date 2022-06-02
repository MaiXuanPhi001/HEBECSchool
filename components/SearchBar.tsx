import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";

export const SearchBar = ({style}:any) => {
    return (
        <View style = {style}>
            <TextInput
                style={styles.input}
                placeholder="Bạn cần tìm sản phẩm gì?"
                placeholderTextColor="#8A8F9E"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Image source={require("../assets/Vector.png")} style = {styles.icon}/>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        height: 50,
        backgroundColor: "#FFF",
        borderRadius: 7,
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    icon: {
        width: 20,
        height: 20,
        position: 'absolute',
        right: 20,
        top: 15,
    },
});
