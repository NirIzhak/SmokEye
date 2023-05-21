import { View, Text,Image,TouchableOpacity,Button, SafeAreaView,StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { SmokeyeContext } from '../Context/SmokEyeContext'
import { Avatar } from "@react-native-material/core";


export default function Profile() {
  const {currentUser} = useContext(SmokeyeContext);
  const fullname = currentUser.firstName +" "+currentUser.lastName;
  return (
    <SafeAreaView style={styles.continer} >
      {currentUser.coins ? (<Text>Coins: {currentUser.coins}</Text>) : (null)}
      <View style={styles.profileView}>
        <View style={{ marginRight: 20 }}>
        {currentUser.image ? 
        (<Avatar image={{ uri: `${currentUser.image}` }} size={100} />) 
        : 
        (<Avatar label={fullname} size={100} color='#F39508' />)}
        </View>
        <View style={styles.continer}>
        <Text style={styles.title_conteiner}>
          <Text style={styles.title}>שם: </Text>
          <Text>{currentUser.firstName} {currentUser.lastName}</Text>
          </Text>
        <Text style={styles.title_conteiner}>
          <Text style={styles.title}>מייל: </Text>
          <Text>{currentUser.email}</Text>
          </Text>
        </View>
      </View>
      <Button title='עריכת פרטים' style={styles.btn_edit}></Button>
    </SafeAreaView>

  )
}
const styles= StyleSheet.create({
  continer:{
    flex:1,
    margin:15,
    marginHorizontal: 20,
    marginVertical:60
  },
  profileView:{
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end'
  },
  title_conteiner:{
    fontSize:20
  },
  title:{
    fontWeight: 'bold'
  },
  btn_edit:{
    
  }
})