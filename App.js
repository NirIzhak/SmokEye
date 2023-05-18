import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
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




const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
  <SmokeyeContextProvider>
    <NavigationContainer>
       <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
        <Stack.Screen name='Register' component={Register} options={{headerShown: false}} />
        <Stack.Screen name='FastReport' component={NotRegisteresUser} options={{headerShown: false}} />

        <Stack.Screen name='userScreens' component={UserTab} options={{headerShown: false}} />
        <Stack.Screen name='adminScreens' component={AdminTab} options={{headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
  </SmokeyeContextProvider>
  );
}


// user screens
const UserTab = ()=>{
  return(
  <Tab.Navigator>
    <Tab.Screen component={NewReport} name='Report' options={{headerShown: false,tabBarLabel: "דיווח חדש", tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={34} color="black" />)}}></Tab.Screen>
    <Tab.Screen component={Info} name='Info' options={{headerShown: false,tabBarLabel: "מידע" ,tabBarBadgeStyle: { backgroundColor: '#007CFF' }, tabBarIcon:()=>(<MaterialCommunityIcons name="information-outline" size={34} color="black" />)}}></Tab.Screen>
    <Tab.Screen component={ReportsStack} name='Reports' options={{tabBarLabel: "הדיווחים שלי" ,headerShown: false,tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={34} color="black" />)}}></Tab.Screen>
    <Tab.Screen component={Store} name='Store' options={{tabBarLabel: "חנות" ,headerShown: false,tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={34} color="black" />)}}></Tab.Screen>
    <Tab.Screen component={Profile} name='Profile' options={{tabBarLabel: "פרופיל" ,headerShown: false,tabBarIcon:()=>(<Entypo name="user" size={34} color="black" />)}}></Tab.Screen>
  </Tab.Navigator>
  )
}

const ReportsStack = ()=>{
  return(
  <Stack.Navigator initialRouteName='myReports'>
  <Stack.Screen name='myReports' component={MyReports} options={{headerShown: false}} />
  <Stack.Screen name='fullReport' component={FullReport} options={{headerShown: false}} />
  </Stack.Navigator>
  )

}

// admin screens
const AdminTab = ()=>{
  return(
    <Tab.Navigator>
  <Tab.Screen component={AllReports} name='Reports' options={{tabBarLabel: "כל הדיווחים" ,headerShown: false,tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={34} color="black" />)}}></Tab.Screen>
  <Tab.Screen component={Map} name='Reports' options={{tabBarLabel: "מפה" ,headerShown: false,tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={34} color="black" />)}}></Tab.Screen>
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


// Reasercher tabs, Regulator tabs , storeAdmin tabs



