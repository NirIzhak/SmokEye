import { View, Text, Image, TouchableOpacity,StyleSheet,Pressable,Button  } from 'react-native'
import React from 'react'

export default function ReportCard({id, description, media, location, address, date, navigation}) {

  const dateArr = date.split(" ");
  /*{ uri: media }*/
  /* <Image source={media ? {uri:media} : {uri:'https://wallpapercave.com/wp/wp6681156.jpg'}} style={styles.img} />*/
  return (
    <View style={styles.continer}>
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
        <View style={styles.btn}>
        <Button 
        
          title='פרטים מלאים'
          color='#F39508'
          onPress={() => {
          navigation.navigate("fullReport", { id, description, media, location, address, date });
     }}
   >
   </Button >
        </View>
   </View>
    </View>

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
    justifyContent: 'center',
  },
  text_bold:{
    fontWeight:'bold',
    textAlign: 'center'
  },
  text_continer:{
    gap:2,
    margin:10,
    textAlign: 'center'

  },
  text_field:{
    fontSize: 15,
    textAlign: 'center'
  },
  btn:{
  }
})
