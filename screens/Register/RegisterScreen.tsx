import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import userStore from '../../store/userStore';
import { observer } from 'mobx-react';
import { height, width } from '../../utils/dimensions';
import { InputPass } from '../Acount/childScreens/ChangePasswordScreeen';
import { Input } from '../PaymentProcess/component/DeliveryAddress';
import { AlertCustom } from '../../components/Alert';
import { colors } from '../../styles/themes';
  

export const RegisterScreen =  observer(({navigation}: any) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const[name, setName] = useState('');
    const[message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    //check validate all input
    const checkValidate = () => {
        if(userName.length === 0|| password.length === 0 || confirmPassword.length === 0 || name.length === 0){
            setMessage('Vui lòng nhập đầy đủ thông tin');
            setShowAlert(true);
            return false;
        }
        if(password !== confirmPassword){
            setMessage('Mật khẩu không trùng khớp');
            setShowAlert(true);
            return false;
        }
        if(password.length < 6){
            setMessage('Mật khẩu phải có ít nhất 6 ký tự');
            setShowAlert(true);
            return false;
        }
        if(userName.length < 10){
            setMessage('Số điện thoại không hợp lệ');
            setShowAlert(true);
            return false;
        }
        setShowAlert(false);
        setMessage('');
        return true;
    }
    const onConfirm = () => {
       setShowAlert(false);
       if(userStore.messageError == ''){
        navigation.navigate('Login');}
    }
        
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ScrollView style = {styles.content}>
            <Image source={require('../../assets/WaterMark.png')} style = {styles.topWarterMark}/>
            <Image source={require('../../assets/HEBEC_School.png')} style = {styles.logo} />
            <View style = {styles.form}>
                <Input 
                    label = "Họ và tên" 
                    value = {name} 
                    onChangeText = {setName} 
                    placeholder = "Nhập họ và tên" />
                <Input 
                    label = "Số điện thoại (tên đăng nhập)" 
                    value = {userName} 
                    onChangeText = {setUserName} 
                    placeholder = "Nhập SĐT" />
                <View style = {styles.password}>
                <InputPass onChangeText = {setPassword} label="Mật khẩu" placeholder='Nhập mật khẩu' isShow ={false}/>
                <InputPass onChangeText = {setConfirmPassword} label="Xác nhận mật khẩu" placeholder='Xác nhận mật khẩu'isShow ={false}/>
               </View>
               <TouchableOpacity 
               onPress={() => {
                navigation.navigate('Login');
               }
                }
               >
                    <Text style={styles.login}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        checkValidate();
                        if(checkValidate()){
                            userStore.register(userName, password, name).then(() => {
                                if(userStore.messageError != ''){
                                    setMessage(userStore.messageError);
                                    setShowAlert(true);
                                }
                                else{
                                    setMessage("Chúc mừng bạn đã tạo tài khoản thành công! Vui lòng đăng nhập để tiếp tục");
                                    setShowAlert(true);
                                }
                            }
                            )
                        }
                    }}
                    style = {styles.button}>
                        {userStore.isLoadingLogin ? <ActivityIndicator size={"small"} color = {colors.white} /> : <Text style={styles.buttonText}>Đăng ký</Text>}
                </TouchableOpacity>
                {showAlert && <AlertCustom 
                title = "Thông báo" 
                message = {message}
                callback = {onConfirm}
                visible = {showAlert} 
                confirmText = {"OK"}/>}
        </View>
     
        <Image source={require('../../assets/WaterMark.png')} style = {styles.bottomWaterMark}/>
        </ScrollView>
    </View>
    )
}
)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    logo: {
        width: 250,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 120,
    },
    form: {
        width: width,
        height: height/2,
        backgroundColor: colors.white,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 7,
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.white,
    },
    login: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.primary,
        alignSelf: 'flex-end',
        marginHorizontal: 20,
        marginTop: -10,
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.white,
    },
    topWarterMark: {
        position: 'absolute',
        top: -50,
        right: 0,
        width: 200,
        resizeMode: 'contain',
        transform: [{ rotate: '180deg' }],
        
    },
    password: {
        flexDirection: 'column',
        marginHorizontal: 20,
    },
    bottomWaterMark: {
       alignSelf: 'flex-start',
       zIndex: -1,
    }
}
)
