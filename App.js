import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Register from './src/Screens/Register';
import Login from './src/Screens/Login';
import NewReport from './src/Screens/NewReport';
import Info from './src/Screens/Info';
import AllReports from './src/Screens/AllReports';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
        <Stack.Screen name='Register' component={Register} options={{headerShown: false}} />
        <Stack.Screen name='Report' component={NewReport} options={{headerShown: false}} />
        <Stack.Screen name='userScreens' component={UserTab} options={{headerShown: false}} ></Stack.Screen>
        <Stack.Screen name='adminScreens' component={AdminTab} options={{headerShown: false}} ></Stack.Screen> 
        </Stack.Navigator>
    </NavigationContainer>
  );
}



const UserTab = ()=>{
  return(
  <Tab.Navigator>
    <Tab.Screen component={NewReport} name='Report' options={{headerShown: false,tabBarLabel: "דיווח חדש", tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={24} color="black" />)}}></Tab.Screen>
    <Tab.Screen component={Info} name='Info' options={{headerShown: false,tabBarLabel: "מידע" ,tabBarBadgeStyle: { backgroundColor: '#007CFF' }, tabBarIcon:()=>(<MaterialCommunityIcons name="information-outline" size={24} color="black" />)}}></Tab.Screen>
    <Tab.Screen component={AllReports} name='Reports' options={{tabBarLabel: "הדיווחים שלי" ,headerShown: false,tabBarIcon:()=>(<MaterialCommunityIcons name="store" size={24} color="black" />)}}></Tab.Screen>
  </Tab.Navigator>
  )
}
const AdminTab = ()=>{
  return(
<Tab.Navigator>
    <Tab.Screen component={ReceivedOrders} name='ReceivedOrders' options={{tabBarLabel: "Open Orders", tabBarIcon:()=>(<MaterialCommunityIcons name="archive-check" size={24} color="black" />)}}></Tab.Screen>
    <Tab.Screen component={TreatmentOrders} name='TreatmentOrders' options={{tabBarLabel: "Treatment Orders", tabBarBadgeStyle: { backgroundColor: '#007CFF' }, tabBarIcon:()=>(<MaterialCommunityIcons name="archive-clock" size={24} color="black" />)}}></Tab.Screen>
    <Tab.Screen component={ClosedOrders} name='ClosedOrders' options={{tabBarLabel: "Closed Orders", tabBarIcon:()=>(<MaterialCommunityIcons name="archive-lock" size={24} color="black" />)}}></Tab.Screen>
  </Tab.Navigator>
  )
}

