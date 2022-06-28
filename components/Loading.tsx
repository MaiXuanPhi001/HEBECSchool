import React from "react";
import { View, ActivityIndicator } from "react-native";
import { colors } from "../styles/themes";

export const Loading = ({style, large}: any) => {
    return (
        <View style={style}>
        <ActivityIndicator size= {large?"large": "small"} color={colors.primary} />
        </View>
    );
    };