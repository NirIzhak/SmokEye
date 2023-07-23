import { View, Text, StyleSheet, Button } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { APIContext } from '../Context/APIContext';

export default function ReportCard({ date, type, address, place, details, image, navigation }) {

  // full address name
  let a = address[0].street + " " + address[0].streetNum + " " + address[0].city;
  //spreate between date and clock
  const dateArr = date.split(" ");


  return (
    <View style={styles.continer}>
      <View style={styles.text_continer}>
        <Text style={styles.text_field}>
          <Text style={styles.text_bold}>תאריך : </Text>
          <Text>{dateArr[0]}</Text>
        </Text>
        <Text>
          <Text style={styles.text_bold}>עסק/אחר : </Text>
          <Text>{type == "Private" ? "פרטי" : "עסק"}</Text>
        </Text>
        <Text>
          <Text style={styles.text_bold}>תיאור : </Text>
          <Text>{details}</Text>
        </Text>
        <Text style={styles.text_field}>
          <Text style={styles.text_bold}>כתובת : </Text>
          <Text>{a}</Text>
        </Text>
        <Text style={styles.text_field}>
          <Text style={styles.text_bold}>מיקום : </Text>
          <Text>{place}</Text>
        </Text>
        <View style={styles.btn}>
          <Button
            title='פרטים מלאים'
            color='#F39508'
            onPress={
              navigation.navigate("fullReport")
            }>
          </Button >
        </View>
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  continer: {
    direction: 'rtl',
    borderColor: '#D9D9D9',
    borderWidth: 2,
    margin: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text_bold: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text_continer: {
    gap: 2,
    margin: 10,
    textAlign: 'center'
  },
  text_field: {
    fontSize: 15,
    textAlign: 'center'
  },
  btn: {
    width: 350,
    marginHorizontal: 10
  }
})
