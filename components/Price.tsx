import React from "react"
import { Text } from "react-native"
import NumberFormat from "react-number-format"

export const PriceText = ({ price, style }: any) => {
    return (
        <NumberFormat 
                value={price } 
                displayType ={'text'} 
                thousandSeparator = '.'
                decimalSeparator=","
                renderText={(value) => <Text style = {style}>{value} đ</Text>} />
    )
}