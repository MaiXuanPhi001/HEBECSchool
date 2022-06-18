import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { News } from '../../screens/NewsWebview/NewsWebview';
import React from 'react';
import { ListProductScreen } from '../../screens/ListProduct/ListProductScreen';
import { TabNavigator } from './TabNavigator';
import { AccountInforScreen } from '../../screens/Acount/childScreens/AccountInforScreen';
import { ChangePassWordScreen } from '../../screens/Acount/childScreens/ChangePasswordScreeen';
import { DetailScreen } from '../../screens/Detail/DetailScreen';
import { CartScreen } from '../../screens/Cart/CartScreen';
import { PaymentProcessScreen } from '../../screens/PaymentProcess/PaymentProcessScreen';
import { SuccessScreen } from '../../screens/PaymentProcess/Success/SuccessScreen';
import { HistoryScreen } from '../../screens/History/HistoryScreen';
import { DetailOrderScreen } from '../../screens/DetailOrder/DetailOrderScreen';

const Stack = createNativeStackNavigator();
export function AuthStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={TabNavigator}  options={{headerShown: false}}/>
        <Stack.Screen name='News' component={News} options={{headerShown: false}}/>
        <Stack.Screen name='ListProduct' component={ListProductScreen} options={{headerShown: false}}/>
        <Stack.Screen name='AccountInfor' component={AccountInforScreen} options={{headerShown: false}}/>
        <Stack.Screen name = 'ChangePassword' component = {ChangePassWordScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Detail' component={DetailScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Cart' component={CartScreen} options={{headerShown: false}}/>
        <Stack.Screen name='PaymentProcess' component={PaymentProcessScreen} options={{headerShown: false}}/>
        <Stack.Screen name = 'PaymentSuccess' component = {SuccessScreen} options={{headerShown: false}}/>
        <Stack.Screen name = 'History' component = {HistoryScreen} options={{headerShown: false}}/>
        <Stack.Screen name = 'OrderDetail' component = {DetailOrderScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}

