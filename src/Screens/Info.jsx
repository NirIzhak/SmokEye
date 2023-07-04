import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Info({ navigation }) {
  return (
    <View>
      <Text style={{ textAlign: "center", marginTop: 110, fontSize: 40 }}>
        מידע
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("userInfo");
        }}
      >
        <Text>בן אדם</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("storeInfo");
        }}
      >
        <Text style={{ marginTop: 150 }}>חנות</Text>
      </TouchableOpacity>
    </View>
  );
}
