import { View, Text, TextInput, useState } from "react-native";
import React from "react";
import DatePicker from 'react-native-date-picker'


export default function NewReport() {
    const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
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
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between", width: '50%', marginLeft: 'auto', marginRight: 'auto', marginTop: 40}}>
        <View>
            <Text onPress={() => setOpen(true)}>תאריך</Text>
            <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />

        </View>
        <View>
            <Text>שעה</Text>
            <Text>כגדכ</Text>
        </View>
      </View>
    </View>
  );
}
