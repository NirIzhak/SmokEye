import { useContext } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { SmokeyeContext } from "../Context/SmokEyeContext";

export default function Login({ navigation }) {
  const {
    setEmail,
    setPassword,
    ConfirmClient,
    email,
    password,
    setCurrentUser,
  } = useContext(SmokeyeContext);
  const handlePress = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView behavior="padding" onPress={handlePress}>
      <View style={Styles.continer}>
        <Text style={{ textAlign: "center", marginTop: 110, fontSize: 40 }}>
          התחברות
        </Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholder="כתובת מייל"
          style={[Styles.input, Styles.input_btn]}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholder="סיסמא"
          secureTextEntry={true}
          style={[Styles.input, Styles.input_btn]}
          onBlur={() => Keyboard.dismiss()}
        />
        <TouchableOpacity
          onPress={() => {
            const typerole = ConfirmClient(email, password);
            if (typerole == undefined) {
              alert("No User");
            } else {
              setCurrentUser(typerole);
              if (typerole.role == "User") {
                navigation.navigate("userScreens");
              } else if (
                typerole.role == "Regulator" ||
                typerole.role == "Reasercher"
                // typerole.role == "Admin"
              ) {
                navigation.navigate("adminScreens");
              } else if (typerole.role == "storeAdmin") {
                navigation.navigate("storeAdmin");
              }
            }
          }}
          style={Styles.login_btn}
        >
          <Text>כניסה</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.button, Styles.input_btn, { marginTop: 100 }]}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text>אין לך משתמש ? הרשם עכשיו !</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[Styles.input_btn, Styles.googleConection]}>
          <Image
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          ></Image>
          <Text>כניסה מהירה עם גוגל</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.button, Styles.input_btn]}
          onPress={() => {
            navigation.navigate("FastReport");
          }}
        >
          <Text>כניסה מהירה ללא התחברות</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const Styles = StyleSheet.create({
  continer: {
    direction: "rtl",
  },
  input_btn: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 50,
    padding: 5,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    width: "70%",
  },
  input: {
    borderColor: "#F39508",
    fontSize: 24,
  },
  button: {
    fontSize: 15,
    backgroundColor: "#F39508",
    borderColor: "transparent",
  },
  googleConection: {
    borderColor: "#F39508",
  },
  login_btn: {
    backgroundColor: "#F39508",
    alignItems: "center",
    margin: 25,
    width: "30%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    borderRadius: 50,
  },
});
