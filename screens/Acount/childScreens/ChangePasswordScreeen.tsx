import axios from "axios"
import { observer } from "mobx-react"
import React, { useState } from "react"
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { HeaderName } from "../../../components/HeaderWithName"
import userStore from "../../../store/userStore"

export const ChangePassWordScreen = observer(({ navigation }: any) => {
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const Submit = () => {
        if (password === "" || newPassword === "" || confirmPassword === "") {
            Alert.alert("Thông báo","Vui lòng nhập đầy đủ thông tin")
        } else if (newPassword !== confirmPassword) {
            Alert.alert("Thông báo","Mật khẩu không trùng khớp")
        } else {
           userStore.updatePassword(password, newPassword)
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <HeaderName name="Đổi mật khẩu" navigation={navigation} />
            <View style={{ flex: 1, marginHorizontal:20, marginTop: 20 }}>
                <Input onChangeText = {setPassword} label="Mật khẩu hiện tại" placeholder='Nhập mật khẩu hiện tại'isShow ={false}/>
                <Input onChangeText = {setNewPassword} label="Mật khẩu mới" placeholder='Nhập mật khẩu mới' isShow ={false}/>
                <Input onChangeText = {setConfirmPassword} label="Xác nhận mật khẩu mới" placeholder='Xác nhận mật khẩu mới'isShow ={false}/>
                <View style={{ marginTop: 40, alignItems: 'center' }}>
                <TouchableOpacity
                onPress={() => {Submit()}}
                style = {styles.button}>
                    <Text style = {styles.buttonText}>Lưu</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
)


const Input = ({ label, value, onChangeText, placeholder }: any) => {
    const [hidePass, setHidePass] = useState(true);
    
    return (
        <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>{label}<Text style={{color:'#F44336'}}> *</Text></Text>
            <TextInput
                secureTextEntry= {hidePass}
                placeholder={placeholder}
                placeholderTextColor="#C9C2C0"
                autoCorrect={false}
                style={styles.inputStyle}
                value={value}
                onChangeText={onChangeText}
            />
            <TouchableOpacity
            onPress={() => {setHidePass(!hidePass) }}
            style = {styles.showPass}>
                <Image source={!hidePass?require('../../../assets/icons/HidePass.png') : require('../../../assets/icons/EyeIcon.png')}/>
            </TouchableOpacity>
           
        </View>
    )
}

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
    containerStyle: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    showPass: {
        position: 'absolute',
        right: 20,
        top: 35,
    },
    button: {
        backgroundColor: '#489620',
        height: 50,
        width: 200,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    }

})