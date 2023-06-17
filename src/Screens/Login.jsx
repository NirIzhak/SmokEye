import { useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, StyleSheet, KeyboardAvoidingView } from "react-native";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, fontSizes } from "../style/AllStyels";
import * as Location from "expo-location";


export default function Login({ navigation }) {
  const {
    setEmail,
    setPassword,
    ConfirmClient,
    email,
    password,
    setCurrentUser,
    setLocation,
    setLatitude,
    setLongitude,
    setCurrentLocation
  } = useContext(SmokeyeContext);
  const handlePress = () => {
    Keyboard.dismiss();
  };


  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Not Granted");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setLatitude(currentLocation.coords.latitude);
      setLongitude(currentLocation.coords.longitude);
      setCurrentLocation([currentLocation.coords.latitude, currentLocation.coords.longitude])
    };
    getPermissions();
  }, []);

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('@viewedOnboarding');
      console.log("clear onboarding")
    } catch (err) {
      console.log("err clearonboarding", err)
    }
  }

  const Validuser = async (e, p) => {
    let user = await ConfirmClient(e, p);
    console.log('user2 :>> ', user);
    /*if (e = "yael@gmail.com") {
      navigation.navigate("storeAdmin");
    }*/
    /* if (user == undefined) {
       alert("No User");
     } else {
       setCurrentUser(user);
       if (user.role == "User") {
         navigation.navigate("userScreens");
       } else if (
         user.role == "Regulator" ||
         user.role == "Reasercher"
         // typerole.role == "Admin"
       ) {
         navigation.navigate("adminScreens");
       } else if (user.role == "storeAdmin") {
         navigation.navigate("storeAdmin");
       }
     }*/

  }

  return (
    <KeyboardAvoidingView behavior="padding" onPress={handlePress}>
      <View style={Styles.continer}>
        <Text style={{ textAlign: "center", marginTop: 80, fontSize: 40 }}>
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
        <TouchableOpacity style={{ marginTop: 10 }}><Text style={{ textAlign: 'center' }}>שכחת סיסמא ? </Text></TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Validuser(email, password);
            //navigation.navigate("adminScreens");

            // const user = ConfirmClient(email, password);
            // if (user == undefined) {
            //   alert("No User");
            // } else {
            //   setCurrentUser(user);
            //   if (user.role == "User") {
            //     navigation.navigate("userScreens");
            //   } else if (
            //     user.role == "Regulator" ||
            //     user.role == "Reasercher"
            //     // typerole.role == "Admin"
            //   ) {
            //     navigation.navigate("adminScreens");
            //   } else if (user.role == "storeAdmin") {
            //     navigation.navigate("storeAdmin");
            //   }
            // }
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
          <Text>כניסה מהירה עם גוגל</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.button, Styles.input_btn]}
          onPress={() => {
            navigation.navigate("FastReport");
          }}
        >
          <Text>דיווח מהיר ללא התחברות</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.button, Styles.input_btn]}
          onPress={() => {
            clearOnboarding();
          }}
        >
          <Text>אנבורדינג</Text>
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
    width: "90%",
  },
  input: {
    borderColor: Colors.borderColor,
    fontSize: fontSizes.XL,
  },
  button: {
    fontSize: fontSizes.S,
    backgroundColor: Colors.primary,
    borderColor: Colors.transparent,
  },
  googleConection: {
    borderColor: Colors.primary,
  },
  login_btn: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    margin: 25,
    width: "30%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    borderRadius: 50,
  },
});
