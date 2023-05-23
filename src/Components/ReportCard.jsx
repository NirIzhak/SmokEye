import { View, Text, Image, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

export default function ReportCard({id, description, media, location, address, date, navigation}) {

  const dateArr = date.split(" ");
  /*{ uri: media }*/
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("fullReport", { id, description, media, location, address, date });
      }}
    >
    <View style={styles.continer}>
      <View>
      <Image source={media ? {uri:media} : {uri:'https://wallpapercave.com/wp/wp6681156.jpg'}} style={styles.img} />
      </View>
   <View style={styles.text_continer}>
   <Text style={styles.text_field}>
        <Text style={styles.text_bold}>תאריך : </Text>
        <Text>{dateArr[0]}</Text>
    </Text>
    <Text> 
      <Text style={styles.text_bold}>עסק/אחר : </Text>
      <Text>עסק </Text>
    </Text>
    <Text style={styles.text_field}>
        <Text style={styles.text_bold}>כתובת : </Text>
        <Text>{address}</Text>
        </Text>
      <Text style={styles.text_field}>
        <Text style={styles.text_bold}>תיאור : </Text>
        <Text>{description}</Text>
        </Text>
   </View>
    </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  continer:{
    direction:'rtl',
    borderColor:'#D9D9D9',
    borderWidth:2,
    margin:5,
    borderRadius:5,
    flexDirection:'row',
  },
  text_bold:{
    fontWeight:'bold'
  },
  text_continer:{
    gap:2,
    margin:10
  },
  text_field:{
    fontSize: 15
  },
  img:{
    width:100,
    height:100,
    margin:5
  }
})
