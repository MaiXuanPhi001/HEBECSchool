import { View, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';

export const SplashScreen = ({navigation} : any) => {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Image source={require('../../assets/WaterMark.png')} style = {{alignSelf: 'flex-end', width: 207, height: 150,opacity: 0.7, transform: [{rotate:'180deg'}]}}/>
        <Image source={require('../../assets/HEBEC_School_White.png')} />
        <Image source={require('../../assets/WaterMark.png')} style = {{alignSelf: 'flex-start',opacity: 0.7, bottom:0}}/>
    </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: '#489620',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });