import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useContext } from "react";
import ReportCard from "../Components/ReportCard";
import { APIContext } from "../Context/APIContext";

export default function MyReports({ navigation }) {
  const { allReports } = useContext(APIContext);
  return (
    <View style={styles.continer} >
      <Text style={[styles.continer_title, styles.title]}>
        כל הדיווחים
      </Text>
      <FlatList
        data={allReports}
        renderItem={({ item }) => (
          <ReportCard {...item} navigation={navigation} />
        )}
        keyExtractor={(item) => item._id}
        style={styles.continer_table}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  continer: {
    marginVertical: 50
  },
  title: { textAlign: "center" },
  continer_title: {
    fontSize: 36
  },
  secondary_title: {
    fontSize: 25
  },
  continer_table: {
    marginVertical: 20,
    marginHorizontal: 2
  }
})
