import { observer } from "mobx-react"
import React, { useState } from "react"
import { Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { PriceText } from "../../../components/Price"
import paymentStore from "../../../store/paymentStore"
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
        backgroundColor: '#fff',
        marginTop: 30,
        marginHorizontal: 20,
        height: height - 200,
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#231F20',
    },
    rowItemRight: {
        alignItems: 'center',
    },
    rowItemValue: {
        fontSize: 16,
        color: '#231F20',
    },
    rowItemPrice: {
        fontSize: 16,
        fontWeight: '500',
        color: '#489620',
    },
    rowItemInput: {
        width: 100,
        height: 35,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#C9C2C0',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 16,
        color: '#231F20',
        backgroundColor: '#fff',
    },
    promotionText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#231F20',
    },
    promotionValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#489620',
    },
    promotionFail: {
        fontSize: 16,
        fontWeight: '400',
        color: '#F44336',
        fontStyle: 'italic',
    },
    noteInput: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#C9C2C0',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 16,
        color: '#231F20',
        backgroundColor: '#fff',
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
        fontSize: 18,
        fontWeight: '700',
        color: '#489620',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonPrev: {
        width: (width - 60)/2,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderColor: '#489620',
        borderWidth: 1,
    },
    buttonTextPrev: {
        color: '#489620',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '700',
    },
    buttonNext: {
        width: (width - 60)/2,
        height: 50,
        backgroundColor: '#489620',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    buttonTextNext: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '700',
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