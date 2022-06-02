import * as React from 'react';
import { useState } from 'react';
import { Router } from './route/Router';
import { SplashScreen } from './screens/Splash/SplashScreen';
import { AuthContext } from './types/Context';

function App() {
  const [auth, setauth] = useState('');
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