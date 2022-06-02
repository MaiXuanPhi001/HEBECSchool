import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AcountScreen } from '../../screens/Acount/AcountScreen';
import Dashboard from '../../screens/Dashboard/Dashboard';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
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
      <Tab.Screen name="Tin tức" component={Dashboard} options={{headerShown: false,
       tabBarIcon: ({color, focused}) => {
          let iconName;
            iconName = require('../../assets/icons/NewsIcon.png');
            color = focused ? '#489620' : '#9E9E9E'
          return <View><View style = {{position: 'absolute', backgroundColor: '#F44336', borderRadius: 9, width: 9, height: 9, left: 19, top: 7 }}/><Image source={iconName} style={{ width: 23, height: 23, tintColor: color, marginTop: 10, marginBottom: 5 }} /></View>;
        }}} />
      <Tab.Screen name="Tài khoản" component={AcountScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
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
