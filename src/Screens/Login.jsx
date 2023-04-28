import React, {useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SmokeyeContext } from "../Context/SmokEyeContext";

export default function Login({navigation}) {

  const {setEmail,setPassword,password,email} = useContext(SmokeyeContext);
  const handlePress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={{ direction: "rtl" }}>
        <Text style={{ textAlign: "center", marginTop: 110, fontSize: 40 }}>
          התחברות
        </Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholder="מייל"
          style={{
            borderBottomWidth: 1,
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 50,
            textAlign: "center",
            fontSize: 28,
          }}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholder="סיסמא"
          secureTextEntry={true}
          style={{
            borderBottomWidth: 1,
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 50,
            textAlign: "center",
            fontSize: 28,
          }}
          onBlur={() => Keyboard.dismiss()}
        />
        <TouchableOpacity>
          <Text
            onPress={() => {
                console.log(password, email)
            }}
            style={{ textAlign: "center", marginTop: 50 }}
          >
            התחברות
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
            navigation.navigate('Register')
        }} style={{marginTop: 100}}>
          <Text style={{ textAlign: "center", borderWidth: 1 }}>
            אין לך משתמש עדיין? הרשם עכשיו!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 100}}>
          <Text style={{ textAlign: "center", borderWidth: 1 }}>
            התחברות מהירה עם גוגל
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 100}}>
          <Text style={{ textAlign: "center", borderWidth: 1 }}>
            דיווח מהיר ללא התחברות
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
