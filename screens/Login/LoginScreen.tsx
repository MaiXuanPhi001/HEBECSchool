import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import userStore from '../../store/userStore';
import { observer } from 'mobx-react';
import { ActivityIndicator } from 'react-native-paper';
import { AlertCustom } from '../../components/Alert';
import { colors, sizes } from '../../styles/themes';
  
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
      <ScrollView>
      <Image  source={require('../../assets/HEBEC_School.png')} style = {styles.logo} />
      <View style = {styles.userName}>
        <Text style={styles.titleInput}>Tên đăng nhập</Text>
        <TextInput
          style = {styles.input} 
          placeholder = "Nhập tên đăng nhập"
          defaultValue={userName}
          onChangeText = {newText => setUserName(newText)}/>
      </View>
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
        <Image style = {{width:20, height: 20}} source={!hidePass? require('../../assets/icons/HidePass.png') :require('../../assets/icons/ShowPass.png')}/>
        </TouchableOpacity>
      </View>
     
      {showAlert && <AlertCustom 
            title = {"Thông báo"}
            message = {message}
            callback = {onClose}
            visible = {showAlert} 
            confirmText = {"OK"}/>}
            <View style = {{alignItems:"flex-end", marginTop: 55, marginRight: 20}}>
                <TouchableOpacity 
                  onPress={() => {navigation.navigate('Register')}}
                  style = {styles.register} >
                  <Text style={styles.textRegister}>Đăng ký tài khoản</Text>
                </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {checkInvalid()}}
          style = {styles.button}>
            {userStore.isLoadingLogin ? <ActivityIndicator size={"small"} color = {colors.white} /> : <Text style = {styles.buttonText}>Đăng nhập</Text>}
      </TouchableOpacity>
      
      <Image source={require('../../assets/WaterMark.png')} style = {{alignSelf: 'flex-end', position: "absolute",width:width/1.5, height: width/1.5*0.7,opacity: 0.7, transform: [{rotate:'180deg'}]}}/>
      <Image source={require('../../assets/WaterMark.png')} style = {{ alignSelf: 'flex-start',opacity: 0.7, zIndex: -1, marginTop: height-675-(width-60)*34/100,width:width/1.2, height: width/1.2*0.7}}/>
      </ScrollView>
    </View>
    )
}
)


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.white,
    },
    password:{
      flexDirection: 'column',
      width: width-40,
      height: 50,
      marginTop: 40,
      marginLeft: 20,
    },
    userName:{
      flexDirection: 'column',
      width: width-40,
      height: 50,
      marginTop: 50,
      marginLeft: 20,
    },
    titleInput: {
      fontSize: 15,
      marginTop:20,
      fontFamily: 'text-regular',
    },
    input:{
      marginTop: 5,
      borderWidth: 1,
      borderColor: colors.mediumGrey,
      width: width-40,
      height: 50,
      borderRadius: 7,
      paddingHorizontal: 20,
    },
    logo:{
      marginTop: 150,
      marginLeft: 80,
      zIndex: 1.2,
      width: width-160,
      height: (width-160)*34/100,
    },
    register:{
      alignItems: 'center',

    },
    textRegister:{
       fontSize: sizes.size14,
      color: colors.primary,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 200,
      height: 50,
      marginLeft: width/2-100,
      marginTop: 50,
      backgroundColor: colors.primary,
      borderRadius: 7,
    },
    buttonText: {
      color: colors.white,
      fontSize: sizes.size16,
      fontWeight: 'bold',
      alignSelf: 'center',
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
