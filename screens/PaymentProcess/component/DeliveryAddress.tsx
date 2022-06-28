import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AlertCustom } from "../../../components/Alert";
import paymentStore from "../../../store/paymentStore";
import { colors } from "../../../styles/themes";
import { height, width } from "../../../utils/dimensions";
import { Dropdown } from "./Dropdown";
export const Input = ({ label, value, onChangeText, placeholder }: any) => {
    return (
        <View style={styles.inputItem}>
            <Text style={styles.labelStyle}>{label}<Text style={{color:colors.error}}> *</Text></Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#C9C2C0"
                style={styles.inputStyle}
                value={value}
                onChangeText={(text) => onChangeText(text)}
            />
        </View>
    )
}

export const DeliveryAddress = observer(() => {
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    useEffect(() => {
        paymentStore.setListCity();
        paymentStore.setDataFromStorage();
    }
    , [])

    const checkInput = () => {
        if (paymentStore.name && paymentStore.phone && paymentStore.address && paymentStore.city.code  && paymentStore.district.code && paymentStore.ward.code) {
            if (paymentStore.phone.length < 10) {
                setMessage("Số điện thoại không hợp lệ");
                setShowAlert(true);
                return;
            }
            else {
            paymentStore.saveData();           
            paymentStore.setOrderEstimate();
            paymentStore.setStep(2);
            }
        }
        else {
            setMessage("Vui lòng nhập đầy đủ thông tin");
            setShowAlert(true);
        }
    }
    const onClose = () => {
        setShowAlert(false)
    }

    return (
        <View style = {{marginTop: 30, justifyContent: "space-between"}}>
            <View>
            <Input label = "Họ và tên" value = {paymentStore.name} onChangeText = {paymentStore.setName} placeholder = "Nhập họ và tên người nhận hàng" />
            <Input label = "Số điện thoại" value = {paymentStore.phone} onChangeText = {paymentStore.setPhone} placeholder = "Nhập số điện thoại người nhận hàng" />
            <Dropdown type = {1} _value = {paymentStore.city.name} />
            <Dropdown type = {2}  _value = {paymentStore.district.name}/>
            <Dropdown type = {3}  _value = {paymentStore.ward.name}/>
            <Input label = "Địa chỉ" value = {paymentStore.address} onChangeText = {paymentStore.setAddress} placeholder = "VD: 1 Đường Bạch Đằng" />
            </View>
            <View style = {styles.footer}>
                <TouchableOpacity style = {styles.button} 
                onPress = {() => {
                    checkInput();
                }}>
                    <Text style = {styles.buttonText}>Tiếp theo</Text>
                </TouchableOpacity>
            </View>
            {showAlert && <AlertCustom 
            title = {"Thông báo"}
            message = {message}
            callback = {onClose}
            visible = {showAlert} 
            confirmText = {"OK"}/>}
        </View>
    );
    }
);
const styles = StyleSheet.create({
    inputStyle: {
        color: colors.darkGrey,
        paddingLeft: 20,
        paddingRight: 50,
        paddingVertical: 15,
        fontSize: 16,
        lineHeight: 20,
        height: 50,
        borderColor: colors.mediumGrey,
        borderWidth: 1,
        borderRadius: 7,
    },
    labelStyle: {
        fontSize: 14,
        lineHeight: 16,
        marginBottom: 5,
        color: colors.darkGrey,
    },
    inputItem: {
        flexDirection: 'column',
        marginBottom: 20,
        marginHorizontal: 20,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 7,
        marginHorizontal: 20,
        width: (width - 60) / 2,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '700',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    }

});