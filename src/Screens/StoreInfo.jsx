import { View, Text, SafeAreaView,ScrollView } from "react-native";
import React, { useContext } from "react";
import Accordion from "../Components/Accordion";
import { SmokeyeContext } from "../Context/SmokEyeContext";


export default function StoreInfo() {
  const {infoData} = useContext(SmokeyeContext);
  const businessData = infoData[0].business;
  
  return (
    <SafeAreaView>
      <ScrollView>
      <Text style={{ textAlign: "center", fontSize: 40 }}>
        מידע לעסק
      </Text>
      {businessData.map((item, index) => (
        <Accordion key={index} title={item.title} content={item.content} />
      ))}
      </ScrollView>
    </SafeAreaView>
  );
}
