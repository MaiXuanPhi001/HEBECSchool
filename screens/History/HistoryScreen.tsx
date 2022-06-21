import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { FlatList, Image, RefreshControl, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper"
import { HeaderName } from "../../components/HeaderWithName";
import { Loading } from "../../components/Loading";
import historyOrdersStore from "../../store/HistoryStore";
import { ItemOrder } from "./components/ItemOrder";

export const HistoryScreen = observer(({navigation}: any) => {
    useEffect(() => {
        historyOrdersStore.setHistoryOrders();
    }, [])
    
    return (
        <View style = {styles.container}>
            <StatusBar style="light" />
            <View style = {{backgroundColor: "#489620",height: 20}}/>
            <HeaderName name = "Lịch sử mua hàng" navigation = {navigation}/>
            {historyOrdersStore.isLoadingHistoryOrders? <Loading large = {true} style = {styles.loading} /> : 
            <View style = {styles.content}>
                {historyOrdersStore.historyOrders.length == 0 ?
                    <View style = {styles.emty}>
                        <Image style = {styles.image} source={require("../../assets/HistoryOrder.png")} />
                        <Text style = {styles.textContent}>
                            Bạn chưa có lịch sử mua hàng nào
                        </Text>
                    </View> 
                    :
                    <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={historyOrdersStore.isLoadingHistoryOrders}
                            onRefresh={() => historyOrdersStore.setHistoryOrders()}
                            colors={["#489620"]}
                        />
                    }
                      data={historyOrdersStore.historyOrders}
                      renderItem={({item}) => <ItemOrder data={item} navigation={navigation} />}
                      keyExtractor={item => item.id.toString()}
                      ItemSeparatorComponent={() => <View style={styles.separator} />}
                      showsVerticalScrollIndicator={false}
                    />
                    }
            </View>
            }
        </View>
    )
}
)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        paddingVertical:15,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
    },
    textHeader: {
        fontSize: 16,
        color: "#489620",
        fontWeight: "bold",
        lineHeight: 24
    },
    content: {
        flex: 1,
    },
    textContent: {
        fontSize: 16,
        color: "#757575",
        lineHeight: 24
    },
    image: {
        width: 100,
        height: 100,
        marginTop:200,
    },
    emty: {
        flex: 1,
        alignItems: "center",
    },
    loading: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    separator: {
        height: 1,
        backgroundColor: "#C9C2C0",
        marginHorizontal: 20,
    },
   
}
);