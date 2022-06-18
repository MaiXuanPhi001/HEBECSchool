import { observer } from "mobx-react";
import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AlertCustom } from "../../../components/Alert";
import { ControlQuantity } from "../../../components/ControlQuantity";
import { PriceText } from "../../../components/Price";
import cartStore from "../../../store/cartStore";

export const RowItem = observer(({ item }: any) => {
    const [showAlert, setShowAlert] = React.useState(false);
    const onChangeQuantity = useCallback(
        (quantity: number) => {
            if(quantity == 0) {
                setShowAlert(true)
            } else {
            cartStore.updateCart(item.book, quantity);
            }
        }
        , [item.id]);

    const onConfirm = (confirm: any) => {
        if (confirm === true) {
            cartStore.updateCart(item.book,0);
        }
        setShowAlert(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.name}>{item.book.name}</Text>
                <PriceText style={styles.price} price = {item.book.price}></PriceText>
            </View>
            <View style={styles.right}>
                <ControlQuantity
                    quantity={item.quantity}
                    onChangeQuantity={onChangeQuantity}
                />
            </View>
            {showAlert && <AlertCustom 
            title = "Xác nhận xoá" 
            message = "Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng?"
            callback = {onConfirm}
            visible = {showAlert} 
            cancelText = "Thoát"
            confirmText = "Xoá"
            />}
        </View>
    )
}
)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    left: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    name: {
        fontSize: 16,
        fontWeight: '400',
        color: '#231F20',
    },
    price: {
        fontSize: 14,
        fontWeight: '400',
        color: '#489620',
    },
});