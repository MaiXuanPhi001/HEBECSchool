import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../../screens/Login/LoginScreen';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator();
export function UnAuthStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}