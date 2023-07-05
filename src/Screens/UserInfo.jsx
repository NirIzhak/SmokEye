import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Accordion from "../Components/Accordion";

export default function UserInfo() {
  const data = [
    {
      title: "Accordion 1",
      content: "ניסיון",
    },
    {
      title: "Accordion 2",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Accordion 3",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
  ];
  return (
    <SafeAreaView>
      <Text style={{ textAlign: "center", fontSize: 40 }}>
        מידע למשתמש
      </Text>
      {data.map((item, index) => (
        <Accordion key={index} title={item.title} content={item.content} />
      ))}
    </SafeAreaView>
  );
}
