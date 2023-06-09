import { View, Text, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import Accordion from "../Components/Accordion";
import { SmokeyeContext } from "../Context/SmokEyeContext";

export default function UserInfo() {
  const {infoData} = useContext(SmokeyeContext);
  const personData = infoData[0].person;

  return (
    <SafeAreaView>
      <Text style={{ textAlign: "center", fontSize: 40 }}>
        מידע למשתמש
      </Text>
      {personData.map((item, index) => (
        <Accordion key={index} title={item.title} content={item.content} />
      ))}
    </SafeAreaView>
  );
}
