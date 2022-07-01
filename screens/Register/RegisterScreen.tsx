import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import userStore from '../../store/userStore';
import { observer } from 'mobx-react';
import { height, width } from '../../utils/dimensions';
import { InputPass } from '../Acount/childScreens/ChangePasswordScreeen';
import { Input } from '../PaymentProcess/component/DeliveryAddress';
import { AlertCustom } from '../../components/Alert';
import { colors, sizes } from '../../styles/themes';
  

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
        <View style = {{ justifyContent: 'space-between', height: height+40}}>
            <View></View>
      
        <Image source={require('../../assets/WaterMark.png')} style = {styles.bottomWaterMark}/>
        </View>
        <ScrollView showsVerticalScrollIndicator = {false} style = {styles.content}>
            <View style  ={{justifyContent:'space-evenly', height:height}}>
            <View>
                <Image source={require('../../assets/WaterMark.png')} style = {styles.topWarterMark}/>
                <Image source={require('../../assets/HEBEC_School.png')} style = {styles.logo} />
            </View>
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
               
                {showAlert && <AlertCustom 
                title = "Thông báo" 
                message = {message}
                callback = {onConfirm}
                visible = {showAlert} 
                confirmText = {"OK"}/>}
               
        </View>
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
        </View>
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
        marginTop: - height * 0.08,
      marginLeft: 90,
      zIndex: 1.2,
      width: width-180,
      height: (width-180)*34/100,
    },
    form: {
        width: width,
        borderRadius: 10,
        alignSelf: 'center',
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
        zIndex: 1.5,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: sizes.size16,
        fontFamily: "text-bold",
        color: colors.white,
    },
    login: {
         fontSize: sizes.size14,
        fontFamily: "text-regular",
        color: colors.primary,
        alignSelf: 'flex-end',
        marginHorizontal: 20,
        marginTop: -10,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        bottom: 0,
    },
    topWarterMark: {
        alignSelf: 'flex-end', 
        width:height/4, 
        height: height/4*0.7,
        opacity: 0.7, 
        transform: [{rotate:'180deg'}]
        
    },
    password: {
        flexDirection: 'column',
        marginHorizontal: 20,
    },
    bottomWaterMark: {
       alignSelf: 'flex-start',
       opacity: 0.7,
        width:height/4,
        height: height/4*0.7,
    }
}
)
