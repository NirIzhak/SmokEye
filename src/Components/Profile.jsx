import { View, Text,Image,TouchableOpacity,Button } from 'react-native'
import React from 'react'

export default function Profile() {
  return (
    <View style={{flex:1,justifyContent:'center'}}>
      <Image source={{uri: 'https://www.bswitch.semicom.co.il/wp-content/uploads/2021/08/8011564373075_1.jpg'}} 
      style={{ width: 100,height: 100}}></Image>
      <Text>here we place the full name </Text>
      <Text>mail address</Text>
      <Button title='עריכת פרטים'></Button>
    </View>
  )
}