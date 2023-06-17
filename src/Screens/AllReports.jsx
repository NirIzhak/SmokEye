import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import ReportCard from "../Components/ReportCard";

export default function MyReports({ navigation }) {
  const { allReports } = useContext(SmokeyeContext);
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
        keyExtractor={(item) => item.id}
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
