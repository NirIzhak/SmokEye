import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import React from "react";

export default function FullReport({ route }) {
  const { id, description, media, location, address, date } = route.params;
  return (
    <SafeAreaView>
      <Text style={styles.title}>פרטי דיווח מלאים:</Text>
      <Text style={styles.text}>תיאור: {description}</Text>
      <Text style={styles.text}>מיקום בקורדינטות: {location[0] + " " + location[1]}</Text>
      <Text style={styles.text}>כתובת מלאה: {address}</Text>
      <Text style={styles.text}>תאריך ושעה: {date}</Text>
      <Text style={styles.imageText}>תמונה:</Text>
      <Image source={{ uri: media }} style={styles.image} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "90%",
    height: "65%",
    borderRadius: 4,
    marginRight: "auto",
    marginLeft: "auto",
  },
  text : {
    textAlign: 'right',
    fontSize: 20,
    margin: 10,
    marginRight: 25
  },
  title:{
    textAlign: 'center',
    fontSize: 35,
    marginTop: 10
  },
  imageText :{
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  }
});
