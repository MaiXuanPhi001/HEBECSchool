import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import userStore from '../../store/userStore';
import { observer } from 'mobx-react';
  
//get with and height of screen
const { width, height } = Dimensions.get('window');

export const LoginScreen =  observer(() => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [hidePass, setHidePass] = useState(true);
    return (
      <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity
        onPress={() => {userStore.login(userName, password)}}
          style = {styles.button}>
          <Text style = {styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
  
      <Text style={styles.register}>Đăng ký tài khoản</Text>
  
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
  
      <Image source={require('../../assets/HEBEC_School.png')} style = {styles.logo} />
  
      <Image source={require('../../assets/WaterMark.png')} style = {{alignSelf: 'flex-end', width: 207, height: 150,opacity: 0.7, transform: [{rotate:'180deg'}]}}/>
      <Image source={require('../../assets/WaterMark.png')} style = {{position: 'absolute',opacity: 0.7, top: height-223}}/>
    </View>
    )
}
)


const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
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
      borderColor: '#9E9E9E',
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
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
      right: 10,
      top: 450,
      color: '#489620',
      marginEnd: 20,
    },
    button: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingHorizontal: 13,
      paddingVertical: 10,
      position: 'absolute',
      width: 200,
      height: 50,
      left: 107,
      top: 478,
      backgroundColor: '#489620',
      borderRadius: 7,
      zIndex: 1.5,
      marginTop: 50,
    },
    buttonText: {
      color: '#fff',
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
  });
