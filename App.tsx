import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {  useState } from 'react';
import Router from './route/Router';
import userStore from './store/userStore';
import * as Updates from 'expo-updates';
import * as Font from 'expo-font';
import * as Sentry from "@sentry/react-native";
import { Platform } from 'react-native';
import { RewriteFrames } from "@sentry/integrations";

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();
const rewriteFramesIntegration = new RewriteFrames({
  iteratee: (frame) => {
    if (frame.filename && frame.filename !== "[native code]") {
      frame.filename =
        Platform.OS === "android"
          ? "app:///index.android.bundle"
          : "app:///main.jsbundle";
    }
    return frame;
  },
});

const rewriteTracing = new Sentry.ReactNativeTracing({
  tracingOrigins: ["localhost", "https://163clone.bmdapp.store", /^\//],
  routingInstrumentation,
  // ... other options
});
if (!__DEV__) {
  Sentry.init({
    dsn: "https://d515835df6a14d27923ee6356268cd38@o1300759.ingest.sentry.io/6535699",
    integrations: [rewriteFramesIntegration, rewriteTracing],
    environment: __DEV__ ? "development" : "production",
    dist: "1.0.0",
    debug: __DEV__ ? true : false,
    enableAutoSessionTracking: true,
    tracesSampleRate: 1,
    enableNative: false,
  });
}
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
      "text-bold": require("./assets/fonts/Roboto-Bold.ttf"),
      "text-regular": require("./assets/fonts/Roboto-Regular.ttf"),
      "text-medium": require("./assets/fonts/Roboto-Medium.ttf"),
      "text-italic": require("./assets/fonts/Roboto-Italic.ttf"),
      "text-montserrat": require("./assets/fonts/Montserrat-Regular.ttf"),
    });
  };


  return (
    ready ? 
      <Router />: null
  );
}

export default Sentry.wrap(App);