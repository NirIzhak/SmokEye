import { View, Text, FlatList } from "react-native";
import React, { useContext } from "react";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import ReportCard from "../Components/ReportCard";

export default function MyReports({navigation}) {
  const { currentUser } = useContext(SmokeyeContext);

  return (
    <View>
      <Text style={{ textAlign: "center", marginTop: 50, fontSize: 40 }}>
        הדיווחים שלי
      </Text>
      <Text style={{textAlign: "center",fontSize: 25 }}>סה"כ - {currentUser.Reports.length}</Text>
      <FlatList
        data={currentUser.Reports}
        renderItem={({ item }) => (
          <ReportCard {...item} navigation={navigation}  />
        )}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 30 }}
      />
    </View>
  );
}
