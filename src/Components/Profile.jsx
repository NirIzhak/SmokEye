import { View, Text, Button, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Avatar } from "@react-native-material/core";
import { APIContext } from "../Context/APIContext";
import { Colors } from "../style/AllStyels"

export default function Profile({ navigation }) {
  const [renderImage, setRenderImage] = useState(false);
  const [image, setImage] = useState("");
  const { currentUser, allMyReports } = useContext(APIContext);
  const fullname = currentUser.firstName + " " + currentUser.lastName;
  const amountReports = allMyReports.length;

  useEffect(() => {
      setImage(currentUser.image || null);
  }, [currentUser.image])
  const EditPage = () => {
    navigation.navigate('editDetails');
  }
  return (
    <View>
      <SafeAreaView style={[styles.continer]}>
        <View style={styles.profileView}>
          <View style={styles.avatar}>
            {image ? (
              <Avatar image={{ uri: `${image}` }} size={100} />
            ) : (
              <Avatar label={fullname} size={100} color="#F39508" />
            )}
          </View>
          <View>
            <Text style={styles.title_conteiner}>{currentUser.firstName + " " + currentUser.lastName}</Text>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.points}>
          <View style={styles.reports}>
            <Text>סה"כ דיווחים </Text>
            <Text style={styles.nums}>{amountReports}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.btn_edit]}
          onPress={EditPage}
        >
          <Text>עריכת פרטים</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>

  );
}

const styles = StyleSheet.create({
  continer: {
    marginVertical: 50,
  },
  pos: {
    position: 'relative'
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
    width: "60%",
    borderWidth: 2,
    borderColor: Colors.transparent,
    alignItems: "center",
    marginHorizontal: 80,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: Colors.primary,
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
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  reports: {
    alignItems: "center",
  },
});
