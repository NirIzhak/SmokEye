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
import Store from './src/Screens/Store';
import Profile from './src/Components/Profile';
import MyReports from './src/Screens/MyReports';
import FullReport from './src/Screens/FullReport';
import Map from './src/Screens/Map';
import AddNewUser from './src/Screens/AddNewUser';
import PushNotification from './src/Screens/PushNotification';
import AddItem from './src/Screens/AddItem';
import UpdateItem from './src/Screens/UpdateItem';
import OnBoarding from './src/Components/OnBoarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
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


  // if user saw the onboarding' he will go to login, else to see the onboarding
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
    <Tab.Screen component={NewReport} name='Report' options={{headerShown: false,tabBarLabel: "דיווח חדש", tabBarIcon:()=>(<MaterialCommunityIcons name="pen" size={26} color="black" />)}}></Tab.Screen>
    <Tab.Screen component={Info} name='Info' options={{headerShown: false,tabBarLabel: "מידע" ,tabBarBadgeStyle: { backgroundColor: '#007CFF' }, tabBarIcon:()=>(<MaterialCommunityIcons name="information-outline" size={26} color="black" />)}}></Tab.Screen>
    <Tab.Screen component={ReportsStack} name='Reports' options={{tabBarLabel: "הדיווחים שלי" ,headerShown: false,tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={26} color="black" />)}}></Tab.Screen>
    <Tab.Screen component={Profile} name='Profile'  options={{tabBarLabel: 'פרופיל',tabBarIcon: () => (<MaterialCommunityIcons name="account" color="#000" size={26} />)}}></Tab.Screen>
  </Tab.Navigator>
  )
}

// reports stack
const ReportsStack = ()=>{
  return(
  <Stack.Navigator initialRouteName='myReports'>
  <Stack.Screen name='myReports' component={MyReports} options={{headerShown: false}} />
  <Stack.Screen name='fullReport' component={FullReport} options={{headerShown: false}} />
  </Stack.Navigator>
  )
}



// reports stack
const AllReportsStack = ()=>{
  return(
  <Stack.Navigator initialRouteName='AllReports'>
  <Stack.Screen name='AllReports' component={AllReports} options={{headerShown: false}} />
  <Stack.Screen name='fullReport' component={FullReport} options={{headerShown: false}} />
  </Stack.Navigator>
  )
}


// admin screens
const ReasercherAndRegulator = ()=>{
  return(
  <Tab.Navigator>
  <Tab.Screen component={AllReportsStack} name='Reports' options={{tabBarLabel: "כל הדיווחים" ,headerShown: false,tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={34} color="black" />)}}></Tab.Screen>
  <Tab.Screen component={Map} name='Map' options={{tabBarLabel: "מפה" ,headerShown: false,tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={34} color="black" />)}}></Tab.Screen>
  <Tab.Screen component={AddNewUser} name='AddNewUser' options={{tabBarLabel: "הוספת משתמש" ,headerShown: false,tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={34} color="black" />)}}></Tab.Screen>
  <Tab.Screen component={PushNotification} name='PushNotification' options={{tabBarLabel: "הודעת פוש" ,headerShown: false,tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={34} color="black" />)}}></Tab.Screen>
  </Tab.Navigator>
  )
}

// not registered user screens
const NotRegisteresUser = ()=>{
  return(
<Tab.Navigator>
    <Tab.Screen component={NewReport} name='NotRegisteresUserReport' options={{headerShown: false,tabBarLabel: "דיווח חדש", tabBarIcon:()=>(<MaterialCommunityIcons name="archive-check" size={34} color="black" />)}}></Tab.Screen>
    <Tab.Screen component={Info} name='NotRegisteresUserInfo' options={{headerShown: false, tabBarLabel: "מידע", tabBarIcon:()=>(<MaterialCommunityIcons name="archive-lock" size={34} color="black" />)}}></Tab.Screen>
  </Tab.Navigator>
  )
}


// stroe admin stack
/*const StoreAdmin = ()=>{
  return(
<Tab.Navigator>
    <Tab.Screen component={Store} name='Store' options={{tabBarLabel: "חנות" ,headerShown: false,tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={34} color="black" />)}}></Tab.Screen>
    <Tab.Screen component={AddItem} name='AddItem' options={{tabBarLabel: "AddItem" ,headerShown: false,tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={34} color="black" />)}}></Tab.Screen>
    <Tab.Screen component={UpdateItem} name='UpdateItem' options={{tabBarLabel: "UpdateItem" ,headerShown: false,tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={34} color="black" />)}}></Tab.Screen>
  </Tab.Navigator>
  )
}*/





