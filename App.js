import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './src/Components/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Login from './src/Screens/Login';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
        {/* <Stack.Screen name='userScreens' component={UserTab} options={{headerShown: false}} ></Stack.Screen>
        <Stack.Screen name='adminScreens' component={AdminTab} options={{headerShown: false}} ></Stack.Screen> */}
        </Stack.Navigator>
    </NavigationContainer>
  );
}
