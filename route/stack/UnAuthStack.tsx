import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../../screens/Login/LoginScreen';
import { RegisterScreen } from '../../screens/Register/RegisterScreen';
import React from 'react';

const Stack = createNativeStackNavigator();
export function UnAuthStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}