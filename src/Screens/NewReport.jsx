import { View, Text, TextInput, Platform, Button } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function NewReport() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(true);

  // on change on date or time input
  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios" || Platform.OS === 'android');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime =
      "Hours: " + tempDate.getHours() + "| Minutes: " + tempDate.getMinutes();
    console.log(fDate + "\n" + fTime);
  };

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

          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
        <View>
          <Text style={{ textAlign: "center" }}>שעה</Text>

          {show && (
            <DateTimePicker
              value={date}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </View>
    </View>
  );
}
