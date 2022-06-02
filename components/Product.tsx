import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export const Product = ({data, navigation}:any) => {
    return (
        <TouchableOpacity 
        style = {styles.container}>
            <View>
                {data.isOutOfStock?  <><View style={styles.mask}></View><Text style={styles.textMask}>Hết hàng</Text></>:null}
                {/* {(data.promotion !=null) ?  
                <View style = {styles.promotion}>
                    <Text style = {styles.promotionText}>{data.promotion}</Text>
                </View>
                :null} */}
                <Image source={{uri: 'https://163clone.bmdapp.store:4164'+data.thumbnail}} style = {styles.image} />
            </View>

            <View style = {styles.content}>
                <Text numberOfLines={2} style = {styles.name}>{data.name}</Text>
                <Text style = {styles.price}>{data.finalPrice} đ</Text>
                <Text style = {styles.oldPrice}>{data.originPrice} đ</Text>
            </View>
        </TouchableOpacity>
    )
    }

    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            width: 177,
            height: 269,
            borderRadius: 7,
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: {
                width: 3,
                height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 7,
            elevation: 2,
            marginBottom: 10,
            marginHorizontal: 10,
            overflow: "hidden",
        },
        image: {
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            height: 177,
            width: 177,
        },
        name: {
            fontSize: 14,
            fontWeight: "400",
            color: "#000",
            marginTop: 10,
        },
        price: {
            fontSize: 14,
            color: "#F44336",
            fontWeight: "700",
            marginTop: 5,
        },
        oldPrice: {
            fontSize: 12,
            color: "#9E9E9E",
            fontWeight: "400",
            marginTop: 5,
            marginBottom: 10,
            textDecorationLine: "line-through",
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
            backgroundColor: "#231F20",
            opacity: 0.3,
        },
        textMask: {
            color: "#fff",
            fontSize: 14,
            fontWeight: "700",
            alignSelf: "center",
            top: "40%",
            justifyContent: "center",
            position: "absolute",
            zIndex: 1.2,
        },
        promotion: {
            position: "absolute",
            transform: [{ rotate: "45deg" }],
            top: 16,
            zIndex: 1.2,
            right: -20,
            width: 100,
            height: 22,
            backgroundColor: "#F44336",
            paddingHorizontal: 50,
            paddingVertical: 5,
        },
        promotionText: {
            color: "#fff",
            fontSize: 14,
            fontWeight: "700",
            alignSelf: "center",
            justifyContent: "center",
            position: "absolute",
            zIndex: 1.3,
        },
    });