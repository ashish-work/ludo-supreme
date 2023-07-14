import { Provider } from 'react-redux';
import store from './stores'
import Game from './components/game'
import Login from './app/screens/Login'
import TimerScreen from './app/screens/Room'
import SignupScreen from './app/screens/Signup';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FirebaseProvider } from './providers/firebase';

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <Provider store={store}>
      <FirebaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='Signup' component={SignupScreen}/>
          <Stack.Screen name='Room' component={TimerScreen}/>
          <Stack.Screen name='Game' component={Game}/>
        </Stack.Navigator>
      </NavigationContainer>
      </FirebaseProvider>
      {/* <Game/> */}
    </Provider>
  );
};