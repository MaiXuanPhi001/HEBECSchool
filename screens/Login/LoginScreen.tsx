import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import userStore from '../../store/userStore';
import { observer } from 'mobx-react';
import { ActivityIndicator } from 'react-native-paper';
import { AlertCustom } from '../../components/Alert';
import { colors } from '../../styles/themes';
  
//get with and height of screen
const { width, height } = Dimensions.get('window');

export const LoginScreen =  observer(({navigation}: any) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const[showAlert, setShowAlert] = useState(false);
    const[message, setMessage] = useState('');
    const onClose = () => {
      setShowAlert(false)
  }
  const checkInvalid = () => {
    if (userName === '' || password === '') {
      setMessage('Vui lòng nhập đầy đủ thông tin')
      setShowAlert(true)
    }
    else {
      userStore.login(userName, password).then(() => {
        if(userStore.messageError !== ""){
          setMessage(userStore.messageError)
          setShowAlert(true)}})
    }
  }

    return (
      <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity
        onPress={() => {checkInvalid()}}
          style = {styles.button}>
            {userStore.isLoadingLogin ? <ActivityIndicator size={"small"} color = {colors.white} /> : <Text style = {styles.buttonText}>Đăng nhập</Text>}
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={() => {
        navigation.navigate('Register')
      }}
      style = {styles.register} >
      <Text style={styles.textRegister}>Đăng ký tài khoản</Text>
      </TouchableOpacity>
      <View style = {styles.password}>
        <Text style={styles.titleInput}>Mật khẩu</Text>
        <TextInput 
          secureTextEntry = {hidePass} 
          style = {styles.input} 
          placeholder = "Nhập mật khẩu"
          defaultValue={password}
          onChangeText = {newText => setPassword(newText)}/>
        <TouchableOpacity
          onPress={() => {setHidePass(!hidePass)}}
          style = {styles.eye}>
        <Image source={!hidePass? require('../../assets/icons/HidePass.png') :require('../../assets/icons/EyeIcon.png')}/>
        </TouchableOpacity>
      </View>
  
      <View style = {styles.userName}>
        <Text style={styles.titleInput}>Tên đăng nhập</Text>
        <TextInput
          style = {styles.input} 
          placeholder = "Nhập tên đăng nhập"
          defaultValue={userName}
          onChangeText = {newText => setUserName(newText)}/>
      </View>
      {showAlert && <AlertCustom 
            title = {"Thông báo"}
            message = {message}
            callback = {onClose}
            visible = {showAlert} 
            confirmText = {"OK"}/>}
  
      <Image source={require('../../assets/HEBEC_School.png')} style = {styles.logo} />
  
      <Image source={require('../../assets/WaterMark.png')} style = {{alignSelf: 'flex-end', width: 207, height: 150,opacity: 0.7, transform: [{rotate:'180deg'}]}}/>
      <Image source={require('../../assets/WaterMark.png')} style = {{position: 'absolute',opacity: 0.7, top: height-200}}/>
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
      justifyContent: 'space-between',
    },
    password:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      position: 'absolute',
      width: width-40,
      height: 50,
      left: 20,
      top: 341,
    },
    userName:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      position: 'absolute',
      width: width-40,
      height: 50,
      left: 20,
      top: 250,
    },
    titleInput: {
      fontSize: 15,
      marginTop:20,
      fontWeight: 'normal',
    },
    input:{
      marginTop: 5,
      borderWidth: 1,
      borderColor: colors.mediumGrey,
      width: width-40,
      height: 50,
      borderRadius: 7,
      paddingHorizontal: 20,
      alignSelf: 'stretch',
      flexGrow : 0,
    },
    logo:{
      top: 100,
      left:82,
      position: 'absolute',
      zIndex: 1.2,
    },
    register:{
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      right: 10,
      top: 450,
      marginEnd: 20,
    },
    textRegister:{
      fontSize: 14,
      color: colors.primary,
    },
    button: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 13,
      paddingVertical: 10,
      position: 'absolute',
      width: 200,
      height: 50,
      left: 107,
      top: 478,
      backgroundColor: colors.primary,
      borderRadius: 7,
      zIndex: 1.5,
      marginTop: 50,
    },
    buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginTop: 2,
    },
    eye: {
      position: 'absolute',
      right: 20,
      top: 60,
    },
    loading: {
      position: 'absolute',
      top: height/2,
      left: width/2,
    }
  });
