import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import React from "react";

export default function FullReport({ date, type, address, place, details, image }) {

  return (
    <SafeAreaView style={styles.continer}>
      <Text style={styles.title}>פרטי דיווח מלאים:</Text>
      <Text style={styles.text}>עסק / פרטי: {type}</Text>
      <Text style={styles.text}>תיאור: {details}</Text>
      <Text style={styles.text}>כתובת מלאה: {address}</Text>
      <Text style={styles.text}>מיקום : {place}</Text>
      <Text style={styles.text}>תאריך: {date}</Text>
      <Text style={styles.imageText}>תמונה:</Text>
      <Image source={{ uri: image }} style={styles.image} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  image: {
    width: "80%",
    height: "50%",
    borderRadius: 4,
    marginRight: "auto",
    marginLeft: "auto",
  },
  text: {
    textAlign: 'right',
    fontSize: 20,
    margin: 10,
    marginRight: 25
  },
  title: {
    textAlign: 'center',
    fontSize: 35,
    marginTop: 10
  },
  imageText: {
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  }
});
