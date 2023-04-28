import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Register from './src/Screens/Register';
import Login from './src/Screens/Login';
import SmokeyeContextProvider from './src/Context/SmokEyeContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
  <SmokeyeContextProvider>
    <NavigationContainer>
       <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
        <Stack.Screen name='Register' component={Register} options={{headerShown: false}} />
        {/* <Stack.Screen name='userScreens' component={UserTab} options={{headerShown: false}} ></Stack.Screen>
        <Stack.Screen name='adminScreens' component={AdminTab} options={{headerShown: false}} ></Stack.Screen> */}
        </Stack.Navigator>
    </NavigationContainer>
  </SmokeyeContextProvider>
  );
}

