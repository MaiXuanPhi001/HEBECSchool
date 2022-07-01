import { observer } from "mobx-react"
import React from "react";
import { View, StatusBar, ScrollView, StyleSheet, Text } from "react-native";
import { HeaderName } from "../../components/HeaderWithName";
import { colors, sizes } from "../../styles/themes";

export const NotiDetail = observer(({navigation, route} : any) => {
    const {title, body} = route.params;
    return (
        <View style = {styles.container}>
            <StatusBar  backgroundColor = {colors.primary} />
            <HeaderName name={title}  navigation = {navigation}/>
            <ScrollView showsVerticalScrollIndicator = {false} style = {styles.content}>
                <Text style = {styles.textContent}>{body}</Text>

            </ScrollView>
        </View>
    );
}
)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    textContent: {
        fontSize: sizes.size16,
        color: colors.darkGrey,
        lineHeight: 24,
        textAlign: "justify",
    },
});
