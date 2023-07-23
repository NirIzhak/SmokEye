import { View, Text, Button, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Avatar } from "@react-native-material/core";
import { APIContext } from "../Context/APIContext";
import { ScrollView } from "react-native-gesture-handler";
import ReportCard from "./ReportCard";

export default function Profile({ navigation }) {
  const [renderImage, setRenderImage] = useState(false);
  const [image, setImage] = useState("");
  const { currentUser, allReports, ShowMyReports } = useContext(APIContext);
  const fullname = currentUser.firstName + " " + currentUser.lastName;
  const amountReports = allReports.length;
  useEffect(() => {
    if (!allReports) return;
    ShowMyReports(currentUser.email);
  }, [allReports]);
  useEffect(() => {
    if (!renderImage) {
      setImage(currentUser.image || null);
      setRenderImage(true);
    }
  }, [renderImage])
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
            <Text style={styles.title_conteiner}>{fullname}</Text>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.points}>
          <View style={styles.reports}>
            <Text>סה"כ דיווחים </Text>
            <Text style={styles.nums}>{amountReports}</Text>
          </View>
        </View>
        <Button
          title="עריכת פרטים"
          color="#F39508"
          style={styles.btn_edit}
          onPress={EditPage}
        ></Button>
      </SafeAreaView>
      <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }}>
        <View>
          <ScrollView horizontal={true} style={{ width: "100%" }}>
            <FlatList
              data={allReports}
              renderItem={({ item }) => (
                <ReportCard key={item.id}{...item} navigation={navigation} />
              )}
              style={styles.continer_table}
            />
          </ScrollView>
        </View>
      </ScrollView>
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
    marginTop: 50,
    width: "50%"
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
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  reports: {
    alignItems: "center",
  },
});
