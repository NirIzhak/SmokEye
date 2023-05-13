import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ReportCard({id, description, media, location, address, date, navigation}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("fullReport", { id, description, media, location, address, date });
      }}
    >
    <View style={{borderWidth: 0.5, marginVertical: 5, width: '80%', marginRight: 'auto', marginLeft: 'auto', alignItems:'center', borderRadius: 6, height: 350}}>
      <Text style={{fontSize: 25, margin: 5}}>{description}</Text>
      <Text style={{fontSize: 15, margin: 5}}>{address}</Text>
      <Image source={{ uri: media }} style={{ width: '90%', height: '80%', borderRadius: 4 }} />
    </View>
    </TouchableOpacity>
  )
}