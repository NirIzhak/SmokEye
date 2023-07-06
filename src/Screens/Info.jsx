import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Info({ navigation }) {
  return (
    <View style={{display: 'flex', justifyContent:"center", alignItems: 'center'}}>
      <Text style={{ textAlign: "center", marginTop: 110, fontSize: 40 }}>
        מידע
      </Text>
      <TouchableOpacity style={{marginTop: 100, borderWidth: 1, width:'50%', padding: 25, borderRadius: 6}}
        onPress={() => {
          navigation.navigate("userInfo");
        }}
      >
        <Text style={{textAlign: "center"}}>בן אדם</Text>
      </TouchableOpacity>

      <TouchableOpacity  style={{marginTop: 100, borderWidth: 1, width:'50%', padding: 25, borderRadius: 6}}
        onPress={() => {
          navigation.navigate("storeInfo");
        }}
      >
        <Text style={{textAlign: "center"}}>חנות</Text>
      </TouchableOpacity>
    </View>
  );
}
