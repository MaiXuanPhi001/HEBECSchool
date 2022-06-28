import { observer } from "mobx-react";
import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import NumberFormat from 'react-number-format';
import { BASE_URL } from "../config";
import { colors, sizes } from "../styles/themes";
import { width } from "../utils/dimensions";
import { PriceText } from "./Price";
import Typo from "./Typo";

export const Product = observer(({data, navigation}:any) => {
    const [imageError, setimageError] = useState(false);
    useEffect(() => {
        promotionCalculate();
    }
    , [])
    const onImageError = () => {
        setimageError(true);
    }
    const promotionCalculate = () => {
        let promotion = (data.originPrice-data.finalPrice)/data.originPrice*100;
        promotion = Math.round(promotion);
        return promotion;
    }


    return (
        <TouchableOpacity 
        style = {styles.container}
        onPress = {() => navigation.navigate('Detail', {data})}>
            <View>
                {data.isOutOfStock?  <><View style={styles.mask}></View><Typo style={styles.textMask}>Hết hàng</Typo></>:null}

                {(promotionCalculate() != 0) ?  
                <View style = {styles.promotion}>
                    <Typo  style = {styles.promotionText}>{promotionCalculate() + "%"}</Typo>
                </View>
                :null}
                <Image source={imageError?require("../assets/HEBEC.png"):{uri: BASE_URL+data.thumbnail}} 
                style = {imageError? styles.imageErr:styles.image} 
                onError = {() => onImageError()}/>
            </View>

            <View style = {styles.content}>
                <Typo numberOfLines={2} style = {styles.name}>{data.name}</Typo>
                <PriceText price = {data.finalPrice} style = {styles.price}/>
                <PriceText price = {data.originPrice} style = {styles.oldPrice}/>
            </View>
        </TouchableOpacity>
    )
    }
)

    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            width: (width-60)/2,
            borderRadius: 7,
            backgroundColor: colors.white,
            shadowColor: colors.darkGrey,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
            marginBottom: 10,
            marginHorizontal: 10,
            overflow: "hidden",
            marginTop: 1,
        },
        image: {
            height: 177,
            width: (width-60)/2,
        },
        imageErr: {
            height: 177,
            width: (width-60)/2-20,
            resizeMode: "contain",
            marginHorizontal: 10,
        },
        name: {
             fontSize: sizes.size14,
            fontFamily: "text-regular",
            color: colors.darkGrey,
            marginTop: 10,
            height: 36,
            lineHeight: 18,
        },
        price: {
             fontSize: sizes.size14,
            color: colors.error,
            fontFamily: "text-bold",
        },
        oldPrice: {
            fontSize: sizes.size12,
            color: colors.mediumGrey,
            fontFamily: "text-regular",
            marginBottom: 10,
            textDecorationLine: "line-through",
            lineHeight: 18,
        },
        content: {
            flexDirection: "column",
            paddingHorizontal: 10,
        },
        mask: {
            position: "absolute",
            top: 0,
            zIndex: 1.1,
            left: 0,
            width: 177,
            height: 177,
            backgroundColor: colors.darkGrey,
            opacity: 0.3,
        },
        textMask: {
            color: colors.white,
             fontSize: sizes.size14,
            fontFamily: "text-bold",
            alignSelf: "center",
            top: "40%",
            justifyContent: "center",
            position: "absolute",
            zIndex: 1.2,
        },
        promotion: {
            position: "absolute",
            transform: [{ rotate: "45deg" }],
            top: 20,
            zIndex: 1.2,
            right: -width/10,
            width: Math.sqrt(((width)/5)*((width)/5)*2),
            height: 22,
            backgroundColor: colors.error,
            paddingHorizontal: 50,
            paddingVertical: 5,
            alignItems: "center",
            justifyContent: "center",
        },
        promotionText: {
            color: colors.white,
             fontSize: sizes.size14,
            fontFamily: "text-bold",
            position: "absolute",
            zIndex: 1.3,
            width: Math.sqrt(((width)/5)*((width)/5)*2),
            right: -(width)/10+7,
        },
    });