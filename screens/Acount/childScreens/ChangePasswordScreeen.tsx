import { observer } from "mobx-react"
import React, { useState } from "react"
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { AlertCustom } from "../../../components/Alert"
import { HeaderName } from "../../../components/HeaderWithName"
import userStore from "../../../store/userStore"
import { colors, sizes } from "../../../styles/themes"

export const ChangePassWordScreen = observer(({ navigation }: any) => {
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const Submit = () => {
        if (password === "" || newPassword === "" || confirmPassword === "") {
            setTitle("Thông báo")
            setMessage("Vui lòng nhập đầy đủ thông tin")
            setShowAlert(true)
        } else if (newPassword !== confirmPassword) {
            setTitle("Thông báo")
            setMessage("Mật khẩu mới và xác nhận mật khẩu không trùng khớp")
            setShowAlert(true)
        } else {
           userStore.updatePassword(password, newPassword).then(() => {
            userStore.success? setTitle("Đổi mật khẩu thành công") : setTitle("Đổi mật khẩu không thành công")
            setMessage(userStore.messageChangePassword)
            setShowAlert(true)
           })
        }
    }
    const onClose = () => {
        setShowAlert(false)
        if(userStore.success){
            userStore.logout()
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <HeaderName name="Đổi mật khẩu" navigation={navigation} />
            <View style={{ flex: 1, marginHorizontal:20, marginTop: 20 }}>
                <InputPass onChangeText = {setPassword} label="Mật khẩu hiện tại" placeholder='Nhập mật khẩu hiện tại'isShow ={false}/>
                <InputPass onChangeText = {setNewPassword} label="Mật khẩu mới" placeholder='Nhập mật khẩu mới' isShow ={false}/>
                <InputPass onChangeText = {setConfirmPassword} label="Xác nhận mật khẩu mới" placeholder='Xác nhận mật khẩu mới'isShow ={false}/>
                <View style={{ marginTop: 40, alignItems: 'center' }}>
                <TouchableOpacity
                onPress={() => {Submit()}}
                style = {styles.button}>
                    {userStore.isLoadingChangePassword ? <ActivityIndicator size="small" color={colors.white} /> : <Text style={styles.buttonText}>Lưu</Text>}
                </TouchableOpacity>
                </View>
            </View>
            {showAlert && <AlertCustom 
            title = {title}
            message = {message}
            callback = {onClose}
            visible = {showAlert} 
            confirmText = {"OK"}/>}
        </View>
    )
}
)


export const InputPass = ({ label, value, onChangeText, placeholder }: any) => {
    const [hidePass, setHidePass] = useState(true);
    
    return (
        <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>{label}<Text style={{color:colors.error}}> *</Text></Text>
            <TextInput
                secureTextEntry= {hidePass}
                placeholder={placeholder}
                placeholderTextColor={colors.grey}
                autoCorrect={false}
                style={styles.inputStyle}
                value={value}
                onChangeText={onChangeText}
            />
            <TouchableOpacity
            onPress={() => {setHidePass(!hidePass) }}
            style = {styles.showPass}>
                <Image style = {{width:20, height: 20}} source={!hidePass?require('../../../assets/icons/HidePass.png') : require('../../../assets/icons/ShowPass.png')}/>
            </TouchableOpacity>
           
        </View>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        color: colors.darkGrey,
        paddingLeft: 20,
        paddingRight: 50,
        paddingVertical: 15,
        fontSize: sizes.size16,
        lineHeight: 20,
        height: 50,
        borderColor: colors.mediumGrey,
        borderWidth: 1,
        borderRadius: 7,
    },
    labelStyle: {
         fontSize: sizes.size14,
        lineHeight: 16,
        marginBottom: 5,
        color: colors.darkGrey,
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
        backgroundColor: colors.primary,
        height: 50,
        width: 200,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
        fontSize: sizes.size16,
        fontFamily: "text-bold",
    }

})