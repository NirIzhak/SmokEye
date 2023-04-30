import { View, Text, TextInput, Platform, Button } from "react-native";
import React from "react";

export default function NewReport() {
  const date = new Date();
  
  return (
    <View>
      <Text style={{ textAlign: "center", marginTop: 110, fontSize: 40 }}>
        על מה הדיווח?
      </Text>
      <Text style={{ marginTop: 40, textAlign: "center" }}>
        פרט בקצרה על המקרה
      </Text>
      <TextInput
        placeholder="לדוגמא:
        עישון במקום לא חוקי
          חנות שמוכרת בניגוד לחוק"
        multiline
        numberOfLines={3}
        style={{
          borderBottomWidth: 1,
          width: "60%",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "right",
        }}
      />
      <Text style={{ marginTop: 40, textAlign: "center" }}>
        תמונות \ סרטונים
      </Text>

      <Text style={{ marginTop: 40, textAlign: "center" }}>כתובת מדוייקת</Text>
      <TextInput
        placeholder="לא חובה"
        style={{
          borderBottomWidth: 1,
          width: "60%",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "right",
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 40,
        }}
      >
        <View>
          <Text style={{ textAlign: "center" }}>תאריך</Text>
          <Text style={{ textAlign: "center" }}>
            {date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear()}
          </Text>
        </View>
        <View>
          <Text style={{ textAlign: "center" }}>שעה</Text>
          <Text style={{ textAlign: "center" }}>
            {date.getHours() + ":" + date.getMinutes()}
          </Text>
        </View>
      </View>
    </View>
  );
}
