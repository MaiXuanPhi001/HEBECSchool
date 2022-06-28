import React from "react"
import { observer } from "mobx-react"
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import paymentStore from "../../../store/paymentStore"
import { height, width } from "../../../utils/dimensions"
import { AlertCustom } from "../../../components/Alert"
import { colors } from "../../../styles/themes"

const RadioButton = ({ label, checked, onPress }: any) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.rowRadio}>
                <View style = {styles.button}>
                    {checked &&  <View style = {styles.buttonInner}/>}
                </View>
                <Text style={styles.label}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export const PayMentMethod = observer(({navigation}: any) => {
    const [showAlert, setShowAlert] = React.useState(false);
    const [showError, setShowError] = React.useState(false); 
    const onConfirm = (confirm: any) => {
        if (confirm === true) {
        paymentStore.setOrder().then(() => {
            if(paymentStore.success == true){
                navigation.navigate("PaymentSuccess")
            }
            else{
                setShowError(true)
            }
        }) }
        setShowAlert(false)
    }
    const onClose = () => {
        setShowError(false)
    }
    return (
       <View style = {{ flex: 1,backgroundColor: colors.white, marginTop: 30, marginHorizontal: 20, justifyContent: "space-between", height:height-200}}>
        <View>
        <View style = {styles.title}>
            <Image source = {require("../../../assets/icons/PaymentMethod.png")} style = {styles.icon}/>
            <Text style = {styles.titleText}>Phương thức thanh toán</Text>
        </View>
        <View style = {styles.radio}>
            <RadioButton label = "Tiền mặt" checked = {paymentStore.paymentType === "CASH"} onPress = {() => paymentStore.setPaymentType("CASH")}/>
            <RadioButton label = "Ví VNPay" checked = {paymentStore.paymentType === "VNPAY"} onPress = {() => paymentStore.setPaymentType("VNPAY")}/>
        </View>
        </View>
        <View style = {styles.footer}>
            <TouchableOpacity style = {styles.buttonPrev} 
                onPress = {() => {
                    paymentStore.setStep(2)
                }}>
                    <Text style = {styles.buttonTextPrev}>Trở lại</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.buttonNext} 
                onPress = {() => {
                    setShowAlert(true)
                }}>
                    <Text style = {styles.buttonTextNext}>Tiếp theo</Text>
                </TouchableOpacity>
            </View>
            {showAlert && <AlertCustom 
            title = "Xác nhận đặt hàng" 
            message = "Bạn có chắc chắn muốn đặt hàng ?" 
            callback = {onConfirm}
            visible = {showAlert} 
            cancelText = {"Huỷ"}
            confirmText = {"Đặt hàng"}/>}
             {showError && <AlertCustom 
            title = "Đặt hàng không thành công" 
            message = {paymentStore.message}
            callback = {onClose}
            visible = {showError} 
            confirmText = {"OK"}/>}
        </View>
    )
}
)

const styles = StyleSheet.create({
    title: {
        flexDirection: "row",
        alignContent: "center",
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    titleText: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.darkGrey,
    },
    radio: {
        flexDirection: "column",
        marginTop: 20,
    },
    rowRadio: {
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.darkGrey,
        marginLeft: 10,
    },
    button: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.darkGrey,
    },
    buttonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
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
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '700',
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
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '700',
    },
    loading: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    }
})



