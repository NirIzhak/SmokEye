import { Text, SafeAreaView, Image, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { SmokeyeContext } from "../Context/SmokEyeContext";

export default function FullReport() {
  const { report } = useContext(SmokeyeContext);
  let a = report.address[0].street + " " + report.address[0].streetNum + " " + report.address[0].city;
  const dateArr = report.date.split(" ");
  return (
    <SafeAreaView style={styles.continer}>
      <Text style={styles.title}>פרטי דיווח מלאים:</Text>
      <Text style={styles.text}>עסק / פרטי: {report.type=="Private" ? "פרטי" : "עסק"}</Text>
      <Text style={styles.text}>תיאור: {report.details}</Text>
      <Text style={styles.text}>כתובת מלאה: {a}</Text>
      <Text style={styles.text}>מיקום : {report.place}</Text>
      <Text style={styles.text}>תאריך: {dateArr[0]}</Text>
      <Text style={styles.imageText}>תמונה:</Text>
      <Image source={{ uri: report.image }} style={styles.image} />
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
