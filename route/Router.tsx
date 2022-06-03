import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { UnAuthStack } from './stack/UnAuthStack';
import { DashboardNavigator } from './stack/AuthStack';
import { AuthContext } from '../types/Context';

export const Router = () => {
  const [auth] = useContext(AuthContext);
  return (
    <NavigationContainer>
      {auth ==''? <UnAuthStack/>: <DashboardNavigator/>}
    </NavigationContainer>
  )
}

