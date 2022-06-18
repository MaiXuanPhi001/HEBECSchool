import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import paymentStore from "../../../store/paymentStore";
import { height, width } from "../../../utils/dimensions";
import { Dropdown } from "./Dropdown";
export const Input = ({ label, value, onChangeText, placeholder }: any) => {
    return (
        <View style={styles.inputItem}>
            <Text style={styles.labelStyle}>{label}<Text style={{color:'#F44336'}}> *</Text></Text>
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

    useEffect(() => {
        paymentStore.setListCity();
        paymentStore.setDataFromStorage();
    }
    , [])

    const checkInput = () => {
        if (paymentStore.name && paymentStore.phone && paymentStore.address && paymentStore.city.code  && paymentStore.district.code && paymentStore.ward.code) {
            if (paymentStore.phone.length < 10) {
                Alert.alert("Thông báo", "Số điện thoại không hợp lệ");
                return;
            }
            else {
            paymentStore.saveData();           
            paymentStore.setOrderEstimate();
            paymentStore.setStep(2);
            }
        }
        else {
            Alert.alert("Vui lòng nhập đầy đủ thông tin");
        }
    }

    return (
        <View style = {{marginTop: 30, height: height-200, justifyContent: "space-between"}}>
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
        </View>
    );
    }
);
const styles = StyleSheet.create({
    inputStyle: {
        color: '#000',
        paddingLeft: 20,
        paddingRight: 50,
        paddingVertical: 15,
        fontSize: 16,
        lineHeight: 20,
        height: 50,
        borderColor: '#9E9E9E',
        borderWidth: 1,
        borderRadius: 7,
    },
    labelStyle: {
        fontSize: 14,
        lineHeight: 16,
        marginBottom: 5,
        color: '#231F20',
    },
    inputItem: {
        flexDirection: 'column',
        marginBottom: 20,
        marginHorizontal: 20,
    },
    button: {
        backgroundColor: '#489620',
        padding: 10,
        borderRadius: 7,
        marginHorizontal: 20,
        width: (width - 60) / 2,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
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