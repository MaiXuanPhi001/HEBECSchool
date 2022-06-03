import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {  useState } from 'react';
import { Router } from './route/Router';
import { SplashScreen } from './screens/Splash/SplashScreen';
import { AuthContext } from './types/Context';

function App() {
  const [auth, setauth] = useState('');
  React.useEffect(() => {
    restoreToken();
  }, []);
  
  const restoreToken = async () => {
    try {
      const value = await AsyncStorage.getItem('TOKEN');
      if (value !== null) {
        setauth(value);
      }
      else {
        setauth('');
      }
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
    <AuthContext.Provider value={[auth, setauth]}>
      <Router/>
    </AuthContext.Provider>:
    <SplashScreen/>
  );
}

export default App;