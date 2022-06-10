import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {  useState } from 'react';
import Router from './route/Router';
import { SplashScreen } from './screens/Splash/SplashScreen';
import cartStore from './store/cartStore';
import userStore from './store/userStore';

function App() {
  React.useEffect(() => {
    restoreToken();
    cartStore.getCartFromStore();
  }, []);
  
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
  console.log(userStore.token);
  return (
    timePassed ? 
      <Router />:
    <SplashScreen/>
  );
}

export default App;