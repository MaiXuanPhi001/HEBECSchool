import { observer } from "mobx-react";
import React, { useContext, useEffect } from "react"
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { HeaderName } from "../../components/HeaderWithName";
import { Loading } from "../../components/Loading";
import { NewsItem } from "../../components/News";
import newsStore from "../../store/newsStore";
import { width } from "../../utils/dimensions";

export const ListNewsScreen = observer(({ navigation }: any) => {
    useEffect(() => {
        newsStore.setNewsList();
    }, []);
    console.log(newsStore.newsList.length);
    const renderItem = ({ item }: any) => {return(
        <NewsItem data = {item} navigation = {navigation}/>
      )};
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <HeaderName name="Tin tức" navigation={navigation} nonback = {true} />
            <View style={{ flex: 1, marginLeft:10 }}>
                <FlatList  
                    data={newsStore.newsList}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingTop: 20 }}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        newsStore.loadMoreNewsList();
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={newsStore.isLoadingNews}
                            onRefresh={() => {
                                newsStore.setNewsList();
                            }}
                            colors={["#489620"]}
                            progressBackgroundColor="#fff"
                        />
                    }
                />
                 {newsStore.isLoadingMoreNews? <Loading style = {styles.loading} large = {false}/> : null}
            </View>
        </View>
    )
}
);
const styles = StyleSheet.create({
    loading: {
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 10,
        right: width / 2 - 25,
        zIndex: 1.5,
        borderRadius: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    }
}
);

