import React, { useContext } from "react"
import { FlatList, StyleSheet, View } from "react-native";
import { HeaderName } from "../../components/HeaderWithName";
import { NewsItem } from "../../components/News";
import { NewsContext } from "../../types/Context";

export const ListNewsScreen = ({ navigation }: any) => {
    const [news] = useContext(NewsContext);
    const renderItem = ({ item }: any) => {return(
        <NewsItem data = {item} navigation = {navigation}/>
      )};
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <HeaderName name="Tin tức" navigation={navigation} nonback = {true} />
            <View style={{ flex: 1, marginLeft:10 }}>
                <FlatList  
                    data={news}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingTop: 20 }}
                />
            </View>
        </View>
    )
}
