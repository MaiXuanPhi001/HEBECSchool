import React from "react"
import { Text } from "react-native"
import NumberFormat from "react-number-format"
import Typo from "./Typo"

export const PriceText = ({ price, style }: any) => {
    return (
        <NumberFormat 
                value={price } 
                displayType ={'text'} 
                thousandSeparator = '.'
                decimalSeparator=","
                renderText={(value) => <Typo style = {style}>{value} đ</Typo>} />
    )
}