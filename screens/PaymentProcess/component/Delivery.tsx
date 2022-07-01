import { observer } from "mobx-react"
import React, { useState } from "react"
import { Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { PriceText } from "../../../components/Price"
import paymentStore from "../../../store/paymentStore"
import { colors, sizes } from "../../../styles/themes"
import { height, width } from "../../../utils/dimensions"

const RowItem = ({ title, value, icon, stylePrice }: any) => {
    return (
        <View style={styles.rowItem}>
            <View style={styles.rowItemLeft}>
                <Image source={icon} style={styles.rowItemIconImage} />
                <Text style={styles.rowItemTitle}>{title}</Text>
            </View>
            <View style={styles.rowItemRight}>
                <PriceText style={stylePrice} price={value}/>
            </View>
        </View>
    )
}
const marginFooter = height > 693 ? height-673 : 20
export const Delivery = observer(() => {
    const [promotion, setPromotion] = useState(paymentStore.promotionCode);
    const [note , setNote] = useState(paymentStore.note);

    return(
        <View style = {styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
            <RowItem title = "Tiền hàng" value = {paymentStore.orderEstimate.moneyTotal} icon = {require("../../../assets/icons/TotalCost.png")} stylePrice = {styles.rowItemPrice}/>
            <View style={{ height: 1, backgroundColor: '#e0e0e0', marginTop: 20, marginBottom: 10 }} />
            <RowItem title = "Phí vận chuyển" value = {paymentStore.orderEstimate.moneyDistance} icon = {require("../../../assets/icons/Delivery.png")} stylePrice = {styles.rowItemPrice}/>
            <View style={{ height: 1, backgroundColor: '#e0e0e0', marginTop: 20, marginBottom: 10 }} />
            <View style={styles.rowItem}>
                <View style={styles.rowItemLeft}>
                    <Image source={require("../../../assets/icons/Promo.png")} style={styles.rowItemIconImage} />
                    <Text style={styles.rowItemTitle}>Mã khuyến mãi</Text>
                </View>
                <View style={styles.rowItemRight}>
                    <TextInput 
                    onEndEditing={() => {
                        paymentStore.setPromotionCode(promotion)
                        paymentStore.setOrderEstimate()}}
                    onChangeText={(text) => { setPromotion(text);} }
                    style={styles.rowItemInput}
                    value={promotion}
                    />
                </View>
            </View>
            <View style = {styles.rowItem}>
                {paymentStore.promotionFail?
                <Text style={styles.promotionFail}>{paymentStore.message}</Text>:
                <Text style={styles.promotionText}>Tiền được khuyến mãi</Text>}
                <PriceText style={styles.promotionValue} price = {paymentStore.orderEstimate.moneyDiscount}/>
            </View>
            <View style={{ height: 1, backgroundColor: '#e0e0e0', marginTop: 20, marginBottom: 10 }} />
                <View style={styles.rowItemLeft}>
                    <Image source={require("../../../assets/icons/HDSDIcon.png")} style={styles.rowItemIconImage} />
                    <Text style={styles.rowItemTitle}>Ghi chú</Text>
                </View>
                    <TextInput 
                    onEndEditing={() =>{
                        paymentStore.setNote(note)
                    }}
                    value={note}
                    onChangeText={(text) => { setNote(text);} }
                    style={styles.noteInput}/>
            <View style={{ height: 1, backgroundColor: '#e0e0e0', marginTop: 20, marginBottom: 10 }} />
            <RowItem title = "Tổng cộng" value = {paymentStore.orderEstimate.moneyFinal} icon = {require("../../../assets/icons/TotalCost.png")} stylePrice = {styles.priceTotal}/>
            </View>
            </TouchableWithoutFeedback>

            <View style = {styles.footer}>
            <TouchableOpacity style = {styles.buttonPrev} 
                onPress = {() => {
                    paymentStore.setStep(1)
                }}>
                    <Text style = {styles.buttonTextPrev}>Trở lại</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {paymentStore.promotionFail? styles.buttonDisable: styles.buttonNext}
                onPress = {() => {
                    paymentStore.setStep(3)
                }}
                disabled = {paymentStore.promotionFail == true}>
                    <Text style = {styles.buttonTextNext}>Tiếp theo</Text>
                </TouchableOpacity>
            </View>
           
        </View>
        

    )
}
)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.white,
        marginTop: 30,
        marginHorizontal: 20,
        justifyContent: 'space-between'
    },
    rowItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    rowItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowItemIconImage: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    rowItemTitle: {
        fontSize: sizes.size18,
        fontWeight: 'bold',
        color: colors.darkGrey,
    },
    rowItemRight: {
        alignItems: 'center',
    },
    rowItemValue: {
        fontSize: sizes.size16,
        color: colors.darkGrey,
    },
    rowItemPrice: {
        fontSize: sizes.size16,
        fontFamily: "text-medium",
        color: colors.primary,
    },
    rowItemInput: {
        width: 100,
        height: 35,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#C9C2C0',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: sizes.size16,
        color: colors.darkGrey,
        backgroundColor: colors.white,
    },
    promotionText: {
        fontSize: sizes.size16,
        fontFamily: "text-regular",
        color: colors.darkGrey,
    },
    promotionValue: {
        fontSize: sizes.size16,
        fontFamily: "text-medium",
        color: colors.primary,
    },
    promotionFail: {
        fontSize: sizes.size16,
        fontFamily: "text-italic",
        color: colors.error,
    },
    noteInput: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#C9C2C0',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: sizes.size16,
        color: colors.darkGrey,
        backgroundColor: colors.white,
        marginTop: 20,
    },
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        width: width,
        height: height,
        
    },
    priceTotal: {
        fontSize: sizes.size18,
        fontFamily: "text-bold",
        color: colors.primary,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: marginFooter,
    },
    buttonPrev: {
        width: (width - 60)/2,
        height: 50,
        backgroundColor: colors.white,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderColor: colors.primary,
        borderWidth: 1,
    },
    buttonTextPrev: {
        color: colors.primary,
        fontSize: sizes.size16,
        textAlign: 'center',
        fontFamily: "text-bold",
    },
    buttonNext: {
        width: (width - 60)/2,
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    buttonTextNext: {
        color: colors.white,
        fontSize: sizes.size16,
        textAlign: 'center',
        fontFamily: "text-bold",
    },
    buttonDisable: {
        width: (width - 60)/2,
        height: 50,
        backgroundColor: 'gray',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },


})