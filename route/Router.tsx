import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { UnAuthStack } from './stack/UnAuthStack';
import { AuthStack } from './stack/AuthStack';
import userStore from '../store/userStore';
import { observer } from 'mobx-react';

 const Router = () => {
  return (
    <NavigationContainer>
      {userStore.token == null? <UnAuthStack/>: <AuthStack/>}
    </NavigationContainer>
  )
}
export default observer(Router);

