import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AcountScreen } from '../../screens/Acount/AccountMenuScreen';
import Dashboard from '../../screens/Dashboard/Dashboard';
import { ListNewsScreen } from '../../screens/News/ListNewScrens';
import { NewsContext } from '../../types/Context';

const Tab = createBottomTabNavigator();
let apiKey = '79dd627c667e46498c7d8f019f302797';
let query = 'vietnam';
let from = new Date().getDate();
let url = `https://newsapi.org/v2/everything?q=${query}&from=${from}&domains=vnexpress.net&apiKey=${apiKey}`

export function TabNavigator() {
  const [news, setnews] = useState('');
  useEffect(() => {
    fecht(url);
}, [])

async function fecht(url :string) {
    try {
        const res = await axios.get(url);
       setnews(res.data.articles);
    } catch (err) {
        console.log(err);
    }
}
  return (
    <NewsContext.Provider value={[news, setnews]}>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({color, focused}) => {
          let iconName;

          if (route.name === 'Trang chủ') {
            iconName = require('../../assets/icons/DashboardIcon.png')
            color = focused ? '#489620' : '#9E9E9E'
          } 
          else if (route.name === 'Tài khoản') {
            iconName = require('../../assets/icons/AccountIcon.png');
            color = focused ? '#489620' : '#9E9E9E'
          }

          return <Image source={iconName} style={{ width: 23, height: 23, tintColor: color, marginTop: 10, marginBottom: 5 }} />;
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: '#fff',
          borderTopColor: '#C9C2C0',
          borderTopWidth: 1,
          paddingBottom: 5,
        },
        tabBarLabel: ({focused}) => {
          let label = route.name;
          return <Text style={focused? styles.focused: styles.unfocused}>{label}</Text>
        },
      })}
    >
      <Tab.Screen name="Trang chủ" component={Dashboard} options={{headerShown: false}}/>
      <Tab.Screen name="Tin tức" component={ListNewsScreen} options={{headerShown: false,
       tabBarIcon: ({color, focused}) => {
          let iconName;
            iconName = require('../../assets/icons/NewsIcon.png');
            color = focused ? '#489620' : '#9E9E9E'
          return <View><View style = {{position: 'absolute', backgroundColor: '#F44336', borderRadius: 9, width: 9, height: 9, left: 19, top: 7 }}/><Image source={iconName} style={{ width: 23, height: 23, tintColor: color, marginTop: 10, marginBottom: 5 }} /></View>;
        }}} />
      <Tab.Screen name="Tài khoản" component={AcountScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
    </NewsContext.Provider>
  );
}
const styles = StyleSheet.create({
  focused: {
    fontSize: 14, 
    fontWeight: '700', 
    color: '#489620' 
  },
  unfocused: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9E9E9E'
  }
});
