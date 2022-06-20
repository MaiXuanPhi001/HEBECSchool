import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AcountScreen } from '../../screens/Acount/AccountMenuScreen';
import Dashboard from '../../screens/Dashboard/Dashboard';
import { ListNewsScreen } from '../../screens/News/ListNewScrens';
import { NotificationScreen } from '../../screens/Notification/NotificationScreen';

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
          else if (route.name === 'Tin tức') {
            iconName = require('../../assets/icons/NewsIcon.png');
            color = focused ? '#489620' : '#9E9E9E'
          }
          else if (route.name === 'Thông báo') {
            iconName = require('../../assets/icons/Union.png');
            color = focused ? '#489620' : '#9E9E9E'
          }

          return <Image source={iconName} style={{ width: 23, height: 23, tintColor: color, marginBottom: 5 }} />;
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: '#fff',
          borderTopColor: '#C9C2C0',
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 10,
        },
        tabBarLabel: ({focused}) => {
          let label = route.name;
          return <Text style={focused? styles.focused: styles.unfocused}>{label}</Text>
        },
      })}
    >
      <Tab.Screen name="Trang chủ" component={Dashboard} options={{headerShown: false}}/>
      <Tab.Screen name='Thông báo' component={NotificationScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Tin tức" component={ListNewsScreen} options={{headerShown: false}} />
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
