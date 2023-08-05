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
        </View>
        <View style={styles.row}>
          <View style={[styles.topic_box, styles.elevation]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("userInfo");
              }}
            >
              <Text style={styles.title_text}>בן אדם</Text>
              <Image source={require("../Images/Businesswoman.png")} style={{ width: 150, height: 150 }} />
            </TouchableOpacity>
          </View>
          <View style={[styles.topic_box, styles.elevation]}>

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
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
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
    //borderWidth: 1,
    width: '50%',
    padding: 25,
    borderRadius: 6,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#D7D5D4',
  },
  title_text: { textAlign: "center" }

})