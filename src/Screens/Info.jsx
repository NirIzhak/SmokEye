import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Info({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            מידע
          </Text>
          <Text style={{ marginHorizontal: 40, textAlign: "center", marginTop: 10 }}>כאן תוכלו למצוא את כל המידע על התקנות  בעסק  ובמרחב הציבורי</Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.topic_box, styles.elevation]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("userInfo");
              }}
            >
              <Text style={styles.title_text}>המרחב הציבורי</Text>
              <Image source={require("../Images/Businesswoman.png")} style={{ width: 150, height: 150 }} />
            </TouchableOpacity>
          </View>
          <View style={[styles.topic_box]}>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("storeInfo");
              }}
            >
              <Text style={styles.title_text}>עסק</Text>
              <Image source={require("../Images/businessImg.png")} style={{ width: 150, height: 150 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>


    </>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: Colors.white,
    height: "100%",
  },
  row: {
    flexDirection: "row"
  },
  title: {
    textAlign: "center",
    marginTop: 110,
    fontSize: 40
  },
  topic_box: {
    marginTop: 100,
    borderWidth: 1,
    width: '48%',
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 5
  },
  title_text: {
    textAlign: "center",
    marginBottom: 15,
  }

})