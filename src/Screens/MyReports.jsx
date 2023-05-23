import { View, Text, FlatList,StyleSheet } from "react-native";
import React, { useContext } from "react";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import ReportCard from "../Components/ReportCard";

export default function MyReports({navigation}) {
  const { currentUser } = useContext(SmokeyeContext);

  return (
    <View style={styles.continer} >
      <Text style={styles.continer_title}>
        הדיווחים שלי
      </Text>
      <Text style={styles.secondary_title}>סה"כ - 
      {currentUser.Reports.length}</Text>
      <FlatList
        data={currentUser.Reports}
        renderItem={({ item }) => (
          <ReportCard {...item} navigation={navigation}  />
        )}
        keyExtractor={(item) => item.id}
        style={styles.table}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  continer:{},
  continer_title:{
    textAlign: "center", 
    marginTop: 50, 
    fontSize: 40 
  },
  secondary_title:{
    textAlign: "center",
    fontSize: 25 
  },
  table:{
    marginTop: 30
  }
})
