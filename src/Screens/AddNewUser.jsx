import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";

export default function AddNewUser() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <SafeAreaView>
      <Text style={{textAlign: 'center', fontSize: '26', fontWeight: 'bold', margin: '5%'}}>הוספת משתמש חדש</Text>
      <Text style={[styles.title]}>שם פרטי</Text>
      <TextInput
        onChangeText={(text) => setFName(text)}
        style={[styles.report_Details, styles.input_Text]}
      />
      <Text style={[styles.title]}>שם משפחה</Text>
      <TextInput
        onChangeText={(text) => setLName(text)}
        style={[styles.report_Details, styles.input_Text]}
      />
      <Text style={[styles.title]}>אימייל</Text>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        style={[
          styles.report_Details,
          styles.input_Text,
          { textAlign: "left" },
        ]}
      />
      <Text style={[styles.title]}>סיסמא</Text>
      <TextInput
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        style={[
          styles.report_Details,
          styles.input_Text,
          { textAlign: "left" },
        ]}
      />
      <Text style={[styles.title]}>חזור על הסיסמא</Text>
      <TextInput
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
        style={[
          styles.report_Details,
          styles.input_Text,
          { textAlign: "left" },
        ]}
      />
      <TouchableOpacity
        onPress={() => {
          console.log(fName, lName, email, password, confirmPassword);
        }}
      >
        <Text style={{backgroundColor: 'grey', padding: '2%', width: '20%', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', borderRadius: 5, marginTop: '10%'}}>הוספה</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input_Text: {
    borderColor: "#8C8A89",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginRight: "auto",
    marginLeft: "auto",
  },
  title: {
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
  },
  report_Details: {
    width: "70%",
    textAlignVertical: "top",
    textAlign: "right",
  },
});
