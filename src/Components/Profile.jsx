import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useContext } from "react";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import { Avatar } from "@react-native-material/core";

export default function Profile() {
  const { currentUser } = useContext(SmokeyeContext);
  const fullname = currentUser.firstName + " " + currentUser.lastName;
  return (
    <SafeAreaView style={styles.continer}>
      <View style={styles.profileView}>
        <View style={styles.avatar}>
          {currentUser.image ? (
            <Avatar image={{ uri: `${currentUser.image}` }} size={100} />
          ) : (
            <Avatar label={fullname} size={100} color="#F39508" />
          )}
        </View>

        <View style={styles.continer}>
          <Text style={styles.title_conteiner}>
            {currentUser.firstName} {currentUser.lastName}
          </Text>
        </View>
      </View>
      <View style={styles.line}></View>

      <View style={styles.points}>
        <View style={styles.reports}>
          <Text style={styles.nums}>{currentUser.Reports.length}</Text>
          <Text>reports</Text>
        </View>
        <View style={styles.reports}>
        {currentUser.coins ? <Text style={styles.nums}>{currentUser.coins}</Text> : <Text >דווח כדי לקבל מטבעות</Text>}
          <Text>coins</Text>
        </View>
      </View>
      <Button title="עריכת פרטים" style={styles.btn_edit}></Button>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  profileView: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title_conteiner: {
    fontSize: 25,
  },
  title: {
    fontWeight: "bold",
  },
  btn_edit: {},
  avatar: {
    marginTop: 25,
  },
  line: {
    height: 2,
    backgroundColor: "#F39508",
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto",
    margin: 15,
  },
  points:{
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    },
    reports:{
      alignItems: 'center',
    },
});
