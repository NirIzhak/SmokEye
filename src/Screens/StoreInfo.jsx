import { Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Accordion from "../Components/Accordion";
import { APIContext } from "../Context/APIContext";
import { Colors } from "react-native/Libraries/NewAppScreen";


export default function StoreInfo() {
  const { infoData } = useContext(APIContext);
  const businessData = infoData[0].business;

  return (
    <SafeAreaView style={styles.continer}>
      <ScrollView>
        <Text style={styles.title}>
          מידע לעסק
        </Text>
        {businessData.map((item, index) => (
          <Accordion key={index} title={item.title} content={item.content} />
        ))}
      </ScrollView>
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
