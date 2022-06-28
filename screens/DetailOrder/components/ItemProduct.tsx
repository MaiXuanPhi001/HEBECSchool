import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { PriceText } from "../../../components/Price"
import { colors, sizes } from "../../../styles/themes"

export const ItemProduct = ({book}: any) => {
    return (
        <View style = {styles.content}>
            <View style = {styles.left}>
                <Text style = {styles.text}>{book.book.name}</Text>
                <View style = {styles.detail}>
                    <PriceText price={book.finalPrice} style = {styles.priceDetail} />
                    <Text style = {styles.priceDetail}>{" x "+ book.quantity}</Text>
                </View>
            </View>
            <View style = {styles.right}>
                <PriceText price={book.finalPrice*book.quantity} style = {styles.price} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    left: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    text: {
        fontSize: sizes.size16,
        fontFamily: "text-regular",
        color:colors.darkGrey,
        marginBottom: 3,
    },
    detail: {
        flexDirection: "row",
        alignItems: "center",
    },
    priceDetail: {
        fontSize: sizes.size16,
        fontFamily: "text-regular",
        color:colors.mediumGrey,
    },
    right: {
        flexDirection: "row",
        alignItems: "center",

    },
    price: {
         fontSize: sizes.size14,
        fontFamily: "text-medium",
        color:colors.primary,
    },
})

