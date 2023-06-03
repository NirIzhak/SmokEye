import {
  Text,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";

export default function AddItem() {
  return (
    <SafeAreaView>
      <Text style={{textAlign: 'center', fontSize: 40, marginBottom: 50}}>הוספת מוצר</Text>
      <Text style={{textAlign: 'center', marginTop: 30}}>שם המוצר</Text>
      <TextInput
        style={styles.input}
        placeholder="אמת סיסמא"
      />
      <Text style={{textAlign: 'center', marginTop: 30}}>תיאור המוצר</Text>
      <TextInput
        style={styles.input}
        placeholder="אמת סיסמא"
      />
      <Text style={{textAlign: 'center', marginTop: 30}}>מחיר המוצר</Text>
      <TextInput
        style={styles.input}
        placeholder="אמת סיסמא"
      />
      <TouchableOpacity style={styles.button} >
        <Text style={{textAlign: 'center'}}>הוספה</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    borderColor: "#8C8A89",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    textAlign: "right",
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 30,
  },
  button: {
    backgroundColor: "gray",
    width: "40%",
    padding: 15,
    borderRadius: 20,
    color: "#fff",
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30
  },
});
