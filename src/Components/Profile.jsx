import { View, Text,Image,TouchableOpacity,Button, SafeAreaView,StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { SmokeyeContext } from '../Context/SmokEyeContext'
import { Avatar } from "@react-native-material/core";


export default function Profile() {
  const {currentUser} = useContext(SmokeyeContext);

  return (
    <SafeAreaView style={styles.continer} >
      <View style={styles.profileView}>
        <View style={{ marginRight: 20 }}>
        {currentUser.image ? 
        (<Avatar image={{ uri: `${currentUser.image}` }} size={100} />) 
        : 
        (<Avatar label={currentUser.firstName + " " + currentUser.lastName} autoColor size={150} />)}
        </View>
        <View style={styles.continer}>
        <Text style={{fontSize: 24}}>{currentUser.firstName} {currentUser.lastName}</Text>
        <Text style={{fontSize: 20}}>{currentUser.email}</Text>
        </View>
      </View>
      <Button title='עריכת פרטים'></Button>
    </SafeAreaView>
  )
}
const styles= StyleSheet.create({
  continer:{
    flex:1,
    margin:15
  },
  profileView:{
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end'
  }
})