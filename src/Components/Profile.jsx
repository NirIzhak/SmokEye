import { View, Text,Image,TouchableOpacity,Button, SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import { SmokeyeContext } from '../Context/SmokEyeContext'
import { Avatar } from "@react-native-material/core";


export default function Profile() {
  const {currentUser} = useContext(SmokeyeContext);

  return (
    <SafeAreaView >
      <View style={{alignItems: 'center'}}>
      {currentUser.image ? (<Avatar image={{ uri: `${currentUser.image}` }} size={150} />) : (<Avatar label={currentUser.firstName + " " + currentUser.lastName} autoColor size={150} />)}
      <Text style={{fontSize: 40}}>{currentUser.firstName} {currentUser.lastName}</Text>
      <Text style={{fontSize: 30}}>{currentUser.email}</Text>
      </View>
      <Button title='עריכת פרטים'></Button>
    </SafeAreaView>
  )
}