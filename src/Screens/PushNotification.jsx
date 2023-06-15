import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function PushNotification() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <SafeAreaView>
      <Text>הודעת פוש</Text>
      
      <Text style={styles.title}>כותרת ההודעה</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTitle(text)}
        />
        <Text style={styles.title}>תוכן ההודעה</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setBody(text)}
        />
        <TouchableOpacity onPress={()=>console.log(title, body)} style={styles.button}>
          <Text style={styles.title}>הרשם</Text>
        </TouchableOpacity>
      
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 18
  },
  input: {
    flexDirection: "row",
    borderColor: "#8C8A89",
    borderRadius:5,
    borderWidth: 1,
    marginBottom: 12,
    textAlign: 'right',
    height: 35,
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
});
