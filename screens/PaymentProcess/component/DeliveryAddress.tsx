import React from "react";
import { ProgressViewIOSComponent, StyleSheet, Text, TextInput, View } from "react-native";

const Input = ({ label, value, onChangeText, placeholder }: any) => {
    return (
        <View style={styles.inputItem}>
            <Text style={styles.labelStyle}>{label}<Text style={{color:'#F44336'}}> *</Text></Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#C9C2C0"
                style={styles.inputStyle}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    )
}

export const DeliveryAddress = () => {
    return (
        <View>
            <Input label="Họ và tên người nhận" value="" onChangeText={() => { }} placeholder="Nhập họ và tên người nhận hàng" />
            <Input label="Số điện thoại" value="" onChangeText={() => { }} placeholder="Nhập số điện thoại người nhận hàng" />
            <Input label="Địa chỉ" value="" onChangeText={() => { }} placeholder="Nhập địa chỉ người nhận hàng" />
        </View>
    );
    };
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

});