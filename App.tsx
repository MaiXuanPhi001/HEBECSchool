import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {  useState } from 'react';
import Router from './route/Router';
import userStore from './store/userStore';
import * as Updates from 'expo-updates';
import * as Font from 'expo-font';

function App() {
  const [ready, setReady] = useState(false);
  React.useEffect(() => {
    restoreToken().then(() => {
      setReady(true);
      loadFont();
    });
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

  const loadFont = async (): Promise<void> => {
    return await Font.loadAsync({
      "text-bold": require("@/assets/fonts/Roboto-Bold.ttf"),
      "text-regular": require("@/assets/fonts/Roboto-Regular.ttf"),
      "text-medium": require("@/assets/fonts/Roboto-Medium.ttf"),
      "text-italic": require("@/assets/fonts/Roboto-Italic.ttf"),
      "text-montserrat": require("@/assets/fonts/Montserrat-Regular.ttf"),
    });
  };


  return (
    ready ? 
      <Router />: null
  );
}

export default App;