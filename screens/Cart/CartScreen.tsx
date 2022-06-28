import { observer } from "mobx-react";
import React from "react"; 
import { Image, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { AlertCustom } from "../../components/Alert";
import { HeaderName } from "../../components/HeaderWithName";
import { PriceText } from "../../components/Price";
import cartStore from "../../store/cartStore";
import paymentStore from "../../store/paymentStore";
import { colors } from "../../styles/themes";
import { RowItem } from "./components/RowItem";

export const CartScreen = observer(({ navigation }: any) => {
    const [showAlert, setShowAlert] = React.useState(false);
    const onConfirm = (confirm: any) => {
        if (confirm === true) {
            cartStore.clearCart();
        }
        setShowAlert(false)
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <HeaderName name="Giỏ hàng" navigation={navigation} />
            <ScrollView 
             refreshControl={
                <RefreshControl
                refreshing={cartStore.isLoading}
                onRefresh={() => {
                   cartStore.reloadCart();
                }
                }
                colors={[colors.primary]}
                progressBackgroundColor={colors.white}
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
                    <TouchableOpacity onPress={() => {
                        setShowAlert(true)
                    }}
                    disabled={cartStore.totalQuantity == 0}
                    >
                        <Text style={cartStore.totalQuantity == 0? styles.clearDisable: styles.clear}>Xoá tất cả</Text>
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
            <TouchableOpacity 
            style={cartStore.totalQuantity > 0 ? styles.button : styles.buttonDisable}
            disabled={cartStore.totalQuantity === 0}
            onPress={() => {
                paymentStore.setStep(1);
                navigation.navigate("PaymentProcess")}}
            >
                <Text style={styles.buttonText}>Đặt sách</Text>
            </TouchableOpacity>
            {showAlert && <AlertCustom 
            title = "Xoá giỏ hàng"
            message = "Bạn có chắc chắn muốn xoá tất cả trong giỏ hàng?" 
            callback = {onConfirm}
            visible = {showAlert} 
            cancelText = {"Huỷ"}
            confirmText = {"Xoá"}/>}
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
        color: colors.darkGrey,
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
        color: colors.primary,
    }
    ,
    footerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.darkGrey,
    }
    ,
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        margin: 20,
        borderRadius: 5,
        alignItems: 'center',
    }
    ,
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    clear: {
        color: colors.error,
        fontSize: 14,
    },
    buttonDisable: {
        backgroundColor: 'gray',
        paddingVertical: 10,
        margin: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    clearDisable: {
        color: colors.mediumGrey,
        fontSize: 14,
    }


});
