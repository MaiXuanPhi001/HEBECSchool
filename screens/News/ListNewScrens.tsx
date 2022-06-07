import React, { useContext } from "react"
import { StyleSheet, View } from "react-native";
import { HeaderName } from "../../components/HeaderWithName";
import { ListNews } from "../../components/ListNews"
import { NewsContext } from "../../types/Context";

export const ListNewsScreen = ({ navigation }: any) => {
    const [news] = useContext(NewsContext);
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <HeaderName name="Tin tức" navigation={navigation} icon = {true} nonback = {true} />
            <View style={{ flex: 1, marginLeft:10, marginTop: 20 }}>
                <ListNews data={news} navigation = {navigation} vertical = {false} />
            </View>
        </View>
    )
}
