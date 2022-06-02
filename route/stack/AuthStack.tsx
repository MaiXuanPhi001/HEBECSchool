import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { News } from '../../screens/News/NewsScreen';
import { AcountScreen } from '../../screens/Acount/AcountScreen';
import React from 'react';
import { View, Image } from 'react-native';
import { ListProductScreen } from '../../screens/ListProduct/ListProductScreen';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator();
export function DashboardNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={TabNavigator}  options={{headerShown: false}}/>
        <Stack.Screen name='News' component={News} options={{headerShown: false}}/>
        <Stack.Screen name='ListProduct' component={ListProductScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}
  export function AcountNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Acount" component={AcountScreen}  options={{headerShown: true,
        headerStyle:{
          backgroundColor: '#489620',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
          color: '#fff',
        },
        headerTitleAlign: 'center',
        headerTitle: 'Tài khoản',
        headerRight: () => (
          <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
            <Image source={require('../../assets/icons/CartIcon.png')} style={{width: 20, height: 20}}/>
          </View>
        ),
        }}/>
      </Stack.Navigator>
  );
};

