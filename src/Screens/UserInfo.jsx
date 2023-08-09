import { Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Accordion from "../Components/Accordion";
import { APIContext } from "../Context/APIContext";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function UserInfo() {
  const { infoData } = useContext(APIContext);
  const personData = infoData.filter((m)=>m.infoFor == "person")

  return (
    <SafeAreaView style={styles.continer}>
      <Text style={styles.title}>
        תקנות במרחב הציבורי
      </Text>
      {personData.map((item, index) => (
        <Accordion key={index} title={item.title} content={item.content} />
      ))}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  continer: {
    flex: 1,
    paddingVertical: 100,
    height: "100%",
    backgroundColor: Colors.white
  },
  title: {
    textAlign: "center",
    fontSize: 36,
    marginBottom: 10
  }
})


