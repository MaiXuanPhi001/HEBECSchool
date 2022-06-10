import { observer } from "mobx-react";
import React from "react";
import { Image, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { HeaderName } from "../../components/HeaderWithName";
import { PriceText } from "../../components/Price";
import cartStore from "../../store/cartStore";
import { RowItem } from "./components/RowItem";

export const CartScreen = observer(({ navigation }: any) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <HeaderName name="Giỏ hàng" navigation={navigation} />
            <ScrollView 
             refreshControl={
                <RefreshControl
                refreshing={cartStore.isLoading}
                onRefresh={() => {
                   cartStore.reloadCart();
                }
                }
                colors={["#489620"]}
                progressBackgroundColor="#fff"
                />
             }
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, margin: 20, }}
            >
                <View style={styles.container}>
                    <View style = {{flexDirection: 'row'}}>
                        <Image source={require("../../assets/icons/Books.png")} style={styles.image} />
                        <Text style={styles.titleText}>Sản phẩm đã chọn</Text>
                    </View>
                    <TouchableOpacity onPress={() => cartStore.clearCart()}>
                        <Text style={styles.clear}>Xoá tất cả</Text>
                    </TouchableOpacity>
                   
                </View>
                <View style={styles.content}>
                    {cartStore.cart.map((item: any) => (
                        <View key={item.id}>
                          <RowItem item={item} />
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.footerTitle}>Tổng tạm tính</Text>
                <PriceText style={styles.footerText} price = {cartStore.total}/>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Đặt sách</Text>
            </TouchableOpacity>

        </View>
    )
})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    image: {
        width: 25,
        height: 25,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#231F20',
    },
    content: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20,
    },
    footerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#489620',
    }
    ,
    footerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#231F20',
    }
    ,
    button: {
        backgroundColor: '#489620',
        paddingVertical: 10,
        margin: 20,
        borderRadius: 5,
        alignItems: 'center',
    }
    ,
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    clear: {
        color: '#F44336',
        fontSize: 14,
    }


});
