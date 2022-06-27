import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {  useState } from 'react';
import Router from './route/Router';
import { SplashScreen } from './screens/Splash/SplashScreen';
import cartStore from './store/cartStore';
import userStore from './store/userStore';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import * as Updates from 'expo-updates';

function App() {
  React.useEffect(() => {
    restoreToken();
    checkUpdate()
  }, []);
  const checkUpdate = async () =>{
   const res= await  Updates.checkForUpdateAsync();
   if(res.isAvailable){
     await Updates.fetchUpdateAsync();
     await Updates.reloadAsync();
   }
  }
  const restoreToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
        userStore.setToken(value);
    } catch (error) {
      console.log(error);
    }
  };
  const [timePassed, setTimePassed] = useState(false);
  setTimeout(() => {
    setTimePassed(true);
  }, 3000)
  return (
    timePassed ? 
      <Router />:
    <SplashScreen/>
  );
}

export default App;