import React from "react";
import { View, ActivityIndicator } from "react-native";

export const Loading = ({style, large}: any) => {
    return (
        <View style={style}>
        <ActivityIndicator size= {large?"large": "small"} color="#489620" />
        </View>
    );
    };