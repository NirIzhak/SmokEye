import { View, Text, FlatList, StyleSheet } from "react-native";
import { useContext, useEffect } from "react";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import ReportCard from "../Components/ReportCard";
import { APIContext } from "../Context/APIContext";

export default function MyReports({ navigation }) {
  const { allReports, ShowMyReports, currentUser } = useContext(APIContext);

  useEffect(() => {
    if (!allReports) return;
    ShowMyReports(currentUser.email);
  }, [allReports]);

  return (
    <View style={styles.continer} >
      <Text style={[styles.continer_title, styles.title]}>
        הדיווחים שלי
      </Text>
      <Text style={[styles.secondary_title, styles.title]}>סה"כ -
        {allReports.length}</Text>
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
