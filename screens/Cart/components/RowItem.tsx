import { observer } from "mobx-react";
import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ControlQuantity } from "../../../components/ControlQuantity";
import { PriceText } from "../../../components/Price";
import cartStore from "../../../store/cartStore";

export const RowItem = observer(({ item }: any) => {
    const onChangeQuantity = useCallback(
        (quantity: number) => {
            cartStore.updateCart(item.book, quantity);
        }
        , [item.id]);


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