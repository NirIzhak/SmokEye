import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'

export default function FullReport({route}) {
    const {id, description, media, location, address, date} = route.params;
  return (
    <SafeAreaView>
      <Text>{description}</Text>
      <Text>{location[0] + " " + location[1]}</Text>
      <Text>{address}</Text>
      <Text>{date}</Text>
      <Image source={{ uri: media }} style={{ width: '90%', height: '80%', borderRadius: 4 }} />
    </SafeAreaView>
  )
}