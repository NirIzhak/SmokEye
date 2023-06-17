import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import Register from './src/Screens/Register';
import Login from './src/Screens/Login';
import SmokeyeContextProvider from './src/Context/SmokEyeContext';
import NewReport from './src/Screens/NewReport';
import Info from './src/Screens/Info';
import AllReports from './src/Screens/AllReports';
import Store from './src/Screens/Store2.0/Store';
import Profile from './src/Components/Profile';
import MyReports from './src/Screens/MyReports';
import FullReport from './src/Screens/FullReport';
import Map from './src/Screens/Map';
import AddNewUser from './src/Screens/AddNewUser';
import PushNotification from './src/Screens/PushNotification';
import AddItem from './src/Screens/Store2.0/AddItem';
import UpdateItem from './src/Screens/Store2.0/UpdateItem';
import OnBoarding from './src/Components/OnBoarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {base_URL} from './utilis/api'
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {
  // user see onboarding or not
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  useEffect(() => {
    checkOnboarding();
  }, [viewedOnboarding]);

  // check if user saw the onboarding
  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (err) {
      console.log('Error - checkOnboarding', err);
    }
  };


  // if user saw the onboarding, he will go to login, else to see the onboarding
  return viewedOnboarding ? (
    <SmokeyeContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="FastReport" component={NotRegisteresUser} options={{ headerShown: false }} />
          <Stack.Screen name="userScreens" component={UserTab} options={{ headerShown: false }} />
          <Stack.Screen name="adminScreens" component={ReasercherAndRegulator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SmokeyeContextProvider>
  ) : (
      <OnBoarding change={setViewedOnboarding} value={viewedOnboarding} />
  );
}


// user screens
const UserTab = ()=>{
  return(
  <Tab.Navigator barStyle={{ backgroundColor: '#fff' }} activeColor="#F39508">
    <Tab.Screen component={NewReport} name='Report' options={({route})=>({tabBarLabel: "דיווח חדש", tabBarActiveTintColor: route.name === 'Report' ? '#F39508' : 'black',headerShown: false ,tabBarLabel: "דיווח חדש", tabBarIcon:()=>(<MaterialCommunityIcons name="pen" size={26} color="black" />)})}></Tab.Screen>
    <Tab.Screen component={Info} name='Info' options={({route})=>({tabBarLabel: "מידע", tabBarActiveTintColor: route.name === 'Info' ? '#F39508' : 'black',headerShown: false ,tabBarLabel: "מידע" ,tabBarBadgeStyle: { backgroundColor: '#007CFF' }, tabBarIcon:()=>(<MaterialCommunityIcons name="information-outline" size={26} color="black" />)})}></Tab.Screen>
    <Tab.Screen component={ReportsStack} name='Reports' options={({route})=>({tabBarLabel: "הדיווחים שלי", tabBarActiveTintColor: route.name === 'Reports' ? '#F39508' : 'black'  ,headerShown: false,tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={26} color="black" />)})}></Tab.Screen>
    <Tab.Screen component={Profile} name='Profile'  options={({route})=>({tabBarLabel: "פרופיל", tabBarActiveTintColor: route.name === 'Profile' ? '#F39508' : 'black', headerShown: false ,tabBarIcon: () => (<MaterialCommunityIcons name="account" color="#000" size={26} />)})}></Tab.Screen>
  </Tab.Navigator>
  )
}

// reports stack
const ReportsStack = ()=>{
  return(
  <Stack.Navigator initialRouteName='myReports'>
  <Stack.Screen name='myReports' component={MyReports} options={({route})=>({tabBarLabel: "הדיווחים שלי", tabBarActiveTintColor: route.name === 'myReports' ? '#F39508' : 'black'}, {headerShown: false})} />
  <Stack.Screen name='fullReport' component={FullReport} options={({route})=>({tabBarLabel: "דיווח", tabBarActiveTintColor: route.name === 'fullReport' ? '#F39508' : 'black'}, {headerShown: false})} />
  </Stack.Navigator>
  )
}



// reports stack
const AllReportsStack = ()=>{
  return(
  <Stack.Navigator initialRouteName='AllReports'>
  <Stack.Screen name='AllReports' component={AllReports} options={({route})=>({tabBarLabel: "דיווחים", tabBarActiveTintColor: route.name === 'AllReports' ? '#F39508' : 'black'}, {headerShown: false})} />
  <Stack.Screen name='fullReport' component={FullReport} options={({route})=>({tabBarLabel: "דיווח", tabBarActiveTintColor: route.name === 'fullReport' ? '#F39508' : 'black'}, {headerShown: false})} />
  </Stack.Navigator>
  )
}


// admin screens
const ReasercherAndRegulator = ()=>{
  return(
  <Tab.Navigator>
  <Tab.Screen component={AllReportsStack} name='Reports' options={({route})=>({tabBarLabel: "כל הדיווחים", tabBarActiveTintColor: route.name === 'Reports' ? '#F39508' : 'black' ,headerShown: false,tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={26} color="black" />)})}></Tab.Screen>
  <Tab.Screen component={Map} name='Map' options={({route})=>({tabBarLabel: "מפה", tabBarActiveTintColor: route.name === 'Map' ? '#F39508' : 'black', headerTitle: "מפה",tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={26} color="black" />)})}></Tab.Screen>
  <Tab.Screen component={AddNewUser} name='AddNewUser' options={({route})=>({tabBarLabel: "הוספת משתמש", tabBarActiveTintColor: route.name === 'AddNewUser' ? '#F39508' : 'black' ,headerShown: false,tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={26} color="black" />)})}></Tab.Screen>
  <Tab.Screen component={PushNotification} name='PushNotification' options={({route})=>({tabBarLabel: "הודעת פוש", tabBarActiveTintColor: route.name === 'PushNotification' ? '#F39508' : 'black' ,headerShown: false,tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={26} color="black" />)})}></Tab.Screen>
  </Tab.Navigator>
  )
}

// not registered user screens
const NotRegisteresUser = ()=>{
  return(
<Tab.Navigator>
    <Tab.Screen component={NewReport} name='NotRegisteresUserReport' options={({route})=>({tabBarLabel: "דיווח חדש", tabBarActiveTintColor: route.name === 'NotRegisteresUserReport' ? '#F39508' : 'black' ,headerShown: false, tabBarIcon:()=>(<MaterialCommunityIcons name="archive-check" size={26} color="black" />)})}></Tab.Screen>
    <Tab.Screen component={Info} name='NotRegisteresUserInfo' options={({route})=>({tabBarLabel: "מידע", tabBarActiveTintColor: route.name === 'NotRegisteresUserInfo' ? '#F39508' : 'black' ,headerShown: false, tabBarIcon:()=>(<MaterialCommunityIcons name="information-outline" size={26} color="black" />)})}></Tab.Screen>
  </Tab.Navigator>
  )
}






