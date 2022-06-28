import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AcountScreen } from '../../screens/Acount/AccountMenuScreen';
import Dashboard from '../../screens/Dashboard/Dashboard';
import { ListNewsScreen } from '../../screens/News/ListNewScrens';
import { NotificationScreen } from '../../screens/Notification/NotificationScreen';
import userStore from '../../store/userStore';
import { colors, sizes } from '../../styles/themes';

const Tab = createBottomTabNavigator();

export const TabNavigator = observer(() => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({color, focused}) => {
          let iconName;

          if (route.name === 'Trang chủ') {
            iconName = require('../../assets/icons/DashboardIcon.png')
            color = focused ? colors.primary : colors.mediumGrey
          } 
          else if (route.name === 'Tài khoản') {
            iconName = require('../../assets/icons/AccountIcon.png');
            color = focused ? colors.primary : colors.mediumGrey
          }
          else if (route.name === 'Tin tức') {
            iconName = require('../../assets/icons/NewsIcon.png');
            color = focused ? colors.primary : colors.mediumGrey
          }

          return <Image source={iconName} style={{ width: 23, height: 23, tintColor: color, marginBottom: 5 }} />;
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: colors.white,
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
      <Tab.Screen name='Thông báo' component={NotificationScreen} options={{headerShown: false,
        tabBarIcon: ({color, focused}) => {
          let iconName;
            iconName = require('../../assets/icons/Union.png');
            color = focused ? colors.primary : colors.mediumGrey
          return <View>{userStore.info.totalNotifyNormal >0 && <View style = {{position: 'absolute', backgroundColor: colors.error, borderRadius: 9, width: 9, height: 9, left: 19, top: 7 }}/>}<Image source={iconName} style={{ width: 23, height: 23, tintColor: color, marginTop: 10, marginBottom: 5 }} /></View>;
        }}} />
      <Tab.Screen name="Tin tức" component={ListNewsScreen} options={{headerShown: false}} />
      <Tab.Screen name="Tài khoản" component={AcountScreen} options={{headerShown: false}}/>
      
    </Tab.Navigator>
  );
}
);
const styles = StyleSheet.create({
  focused: {
     fontSize: sizes.size14, 
    fontFamily: "text-bold", 
    color: colors.primary 
  },
  unfocused: {
     fontSize: sizes.size14,
    fontFamily: "text-regular",
    color: colors.mediumGrey
  }
});
