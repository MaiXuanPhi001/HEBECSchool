import React from "react"
import { ScrollView, StyleSheet } from "react-native"
import { HeaderName } from "../../components/HeaderWithName"

export const DetailScreen = ({navigation, route} : any) => {
    const { data } = route.params;
    return (
        <ScrollView style = {styles.container}>
            <HeaderName name="Thông tin sách" navigation={navigation} icon = {true}/>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
})
