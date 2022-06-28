import { observer } from "mobx-react"
import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { PriceText } from "../../../components/Price"
import { colors, sizes } from "../../../styles/themes"
import { convertDate } from "../../../types/DateTime"
import { width } from "../../../utils/dimensions"

export const getStatus = (status: string) => {
    switch (status) {
        case "PENDING":
            return "Chờ xác nhận"
        case "PACKAGE":
            return "Đóng gói"
        case "DELIVERING":
            return "Đang vận chuyển"
        case "COMPLETE":
            return "Đã giao"
        case "CANCEL":
            return "Đã hủy"
        default:
            return "Chờ xác nhận"
    }
}

export const ItemOrder = observer(({data, navigation} : any) => {
    
    const getQuantity = (orderDetails: any) => {
        let quantity = 0;
        orderDetails.forEach((item: any) => {
            quantity += item.quantity;
        })
        return quantity;
    }
    return (
        <View style = {styles.container}>
            <TouchableOpacity
            onPress={() => navigation.navigate("OrderDetail", {data: data})}
            style = {styles.content}>
                <View style = {styles.icon}>
                    <Image style = {styles.icon} source={require("../../../assets/icons/BoxShipping.png")} />
                </View>
                <View style = {styles.Detail}>
                    <View style = {styles.DetailTitle}>
                        <Text style = {styles.textTitle}>{data.code}</Text>
                        <PriceText price = {data.moneyFinal} style = {styles.textPrice}/>
                    </View>
                    <View style = {styles.row}>
                        <Text style = {styles.textDetail}>{convertDate(data.createdAt)}</Text>
                    </View>
                    <View style = {styles.row}>
                        <Text style = {styles.textDetail}>Giao đến:</Text>  
                        <Text
                        numberOfLines={1}
                        style = {styles.textValue}>{data.address +", "+ data.addressWard.pathWithType}</Text>
                    </View>
                    <View style = {styles.DetailStatus}>
                        <View style = {styles.row}>
                            <Text style = {styles.textDetail}>Số lượng:</Text>
                            <Text style = {styles.textValue}>{getQuantity(data.orderDetails)+" sản phẩm"}</Text>
                        </View>
                        <View style = {styles.dot}/>
                        <Text style = {data.status =="CANCEL"? styles.textStatusCancel: styles.textStatus}>{getStatus(data.status)}</Text>
                    </View> 

                </View>
            </TouchableOpacity>
        </View>
    )
}
)
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: 20,
    },
    content: {
        flexDirection: "row",
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    Detail: {
        flex: 1,
        flexDirection: "column",
    },
    DetailTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
        alignItems: "center",
    },
    textTitle: {
        fontSize: sizes.size18,
        fontFamily: "text-medium",
        color:colors.darkGrey,
    },
    textDetail: {
         fontSize: sizes.size14,
        fontFamily: "text-regular",
        color:colors.mediumGrey,
        alignItems: "center",
    },
    textValue: {
         fontSize: sizes.size14,
        fontFamily: "text-medium",
        color:colors.mediumGrey,
        marginLeft: 5,
        maxWidth: width - 140,
    },
    DetailStatus: {
        flexDirection: "row",
        alignItems: "center",
    },
    textStatus: {
         fontSize: sizes.size14,
        fontFamily: "text-medium",
        color:colors.primary,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.mediumGrey,
        marginHorizontal: 10,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
    },
    textPrice: {
        fontSize: sizes.size16,
        fontFamily: "text-bold",
        color:colors.error,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    textStatusCancel: {
         fontSize: sizes.size14,
        fontFamily: "text-medium",
        color:colors.error,
    },
}
)