import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import { Avatar } from "@react-native-material/core";

export default function Profile({ route }) {
  const { currentUser, allReports } = useContext(SmokeyeContext);
  //const { firstName, lastName, role, image, reports } = route.params || {};
  const fullname = currentUser.firstName + " " + currentUser.lastName;//currentUser.firstName + " " + currentUser.lastName;
  const image = image == null ? "" : currentUser.image;
  const reports = allReports.filter((r)=> r.reporter == `${currentUser.firstName} ${currentUser.lastName}`)
  
  //{currentUser.reports.length}
  return (
    <SafeAreaView style={styles.continer}>
      <View style={styles.profileView}>
        <View style={styles.avatar}>
          {image ? (
            <Avatar image={{ uri: `${image}` }} size={100} />
          ) : (
            <Avatar label={fullname} size={100} color="#F39508" />
          )}
        </View>
        <View>
          <Text style={styles.title_conteiner}>
            {fullname}
          </Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.points}>
        <View style={styles.reports}>
          <Text style={styles.nums}>{reports.length}</Text>
          <Text>reports</Text>
        </View>
      </View>
      <Button title="עריכת פרטים" color="#F39508" style={styles.btn_edit}></Button>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  continer: {
    marginVertical: 50,

  },
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
  btn_edit: {
    marginTop: 5
  },
  avatar: {
    //marginTop: 25,
  },
  line: {
    height: 2,
    backgroundColor: "#F39508",
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto",
    margin: 15,
  },
  points: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  reports: {
    alignItems: 'center',
  },
});
