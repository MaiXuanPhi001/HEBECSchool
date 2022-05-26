import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Dashboard} from './Dashboard';

function HomeScreen( {route}) {
    const { name, password } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>{name}</Text>
      <Text>{password}</Text>
    </View>
  );
}

function LoginScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>

    <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard',{
          name: userName,
          password: password,
        })}
        style = {styles.button}>
        <Text style = {styles.buttonText}>Đăng nhập</Text>
    </TouchableOpacity>

    <Text style={styles.register}>Đăng ký tài khoản</Text>

    <View style = {styles.password}>
      <Text style={styles.titleInput}>Mật khẩu</Text>
      <TextInput 
        secureTextEntry 
        style = {styles.input} 
        placeholder = "Nhập mật khẩu"
        defaultValue={password}
        onChangeText = {newText => setPassword(newText)}/>
      <Image source={require('./assets/ShowPass.png')} style = {styles.icon}/>
    </View>

    <View style = {styles.userName}>
      <Text style={styles.titleInput}>Tên đăng nhập</Text>
      <TextInput
        style = {styles.input} 
        placeholder = "Nhập tên đăng nhập"
        defaultValue={userName}
        onChangeText = {newText => setUserName(newText)}/>
    </View>

    <Image source={require('./assets/HEBEC_School.png')} style = {styles.logo} />

    <Image source={require('./assets/WaterMark.png')} style = {{alignSelf: 'flex-end', width: 207, height: 150,opacity: 0.7, transform: [{rotate:'180deg'}]}}/>
    <Image source={require('./assets/WaterMark.png')} style = {{justifyContent: 'flex-end', position: 'absolute',opacity: 0.7, bottom:0}}/>
  </View>
);
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  password:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'absolute',
    width: 374,
    height: 50,
    left: 20,
    top: 341,
  },
  userName:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'absolute',
    width: 374,
    height: 50,
    left: 20,
    top: 250,
  },
  titleInput: {
    fontSize: 15,
    marginTop:20,
    fontWeight: 'normal',
  },
  input:{
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#9E9E9E',
    width: 374,
    height: 50,
    borderRadius: 7,
    paddingHorizontal: 10,
    alignSelf: 'stretch',
    flexGrow : 0,
  },
  logo:{
    top: 100,
    left:82,
    position: 'absolute',
    zIndex: 1.2,
  },
  icon: {
    alignSelf: 'flex-end',
    marginTop: -35,
    marginEnd: 20, 
  },
  register:{
    position: 'absolute',
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    right: 10,
    top: 450,
    color: '#489620',
    marginEnd: 20,
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 13,
    paddingVertical: 10,
    position: 'absolute',
    width: 200,
    height: 50,
    left: 107,
    top: 478,
    backgroundColor: '#489620',
    borderRadius: 7,
    zIndex: 1.5,
    marginTop: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 2,
  }
});

export default App;