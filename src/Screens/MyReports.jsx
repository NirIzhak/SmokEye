import { View, Text, FlatList, StyleSheet } from "react-native";
import { useContext, useEffect } from "react";
import ReportCard from "../Components/ReportCard";
import { APIContext } from "../Context/APIContext";

export default function MyReports({ navigation }) {
  const { allMyReports, ShowMyReports, currentUser } = useContext(APIContext);

  useEffect(() => {
    checkReports(currentUser.email);
  }, [allMyReports]);
  const checkReports = () => {
    if (!allMyReports) { return; }
    else {
      ShowMyReports(currentUser.email);
    }
  }
  return (
    <View style={styles.continer} >
      <Text style={[styles.continer_title, styles.title]}>
        הדיווחים שלי
      </Text>
      <Text style={[styles.secondary_title, styles.title]}>סה"כ -
        {allMyReports.length}</Text>
      <FlatList
        data={allMyReports}
        renderItem={({ item }) => (
          <ReportCard key={item.id}{...item} navigation={navigation} />
        )}
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
