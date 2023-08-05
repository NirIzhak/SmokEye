import { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Keyboard, StyleSheet, ImageBackground, Image, TouchableWithoutFeedback } from "react-native";
import { Button, Divider, TextInput } from "react-native-paper";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, fontSizes } from "../style/AllStyels";
import * as Location from "expo-location";
import { APIContext } from "../Context/APIContext";


/*
 <KeyboardAvoidingView behavior="padding" onPress={handlePress} >
  </KeyboardAvoidingView>
*/

export default function Login({ navigation }) {
  const { setEmail, setPassword, email, password, setCurrentLocation } = useContext(SmokeyeContext);
  const { ConfirmClient, setLatitude, setLongitude, setLocation } = useContext(APIContext);
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
  // chack who is the current user and his spicific role
  const Validuser = async (e, p) => {
    let role = await ConfirmClient(e, p);
    if (role == "client") { navigation.navigate("userScreens"); }
    else if (role == "Regulator" || role == "Reasercher") { navigation.navigate("adminScreens"); }
    else if (role == "storeAdmin") { navigation.navigate("storeAdmin"); }
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress} >
      <View style={Styles.continer}>
        <Image
          source={require("../Images/logo.png")}
          style={Styles.logo}
          resizeMode="center"
        />
        <Text style={{ textAlign: "center", fontSize: 36 }}>
          התחברות
        </Text>
        <TextInput
          mode="outlined"
          label="Email"
          activeOutlineColor={Colors.primary}
          onChangeText={(text) => setEmail(text)}
          style={Styles.login_input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          mode="outlined"
          activeOutlineColor={Colors.primary}
          style={Styles.login_input}
          onChangeText={(text) => setPassword(text)}
          label="סיסמא"
          secureTextEntry={true}
          onBlur={() => Keyboard.dismiss()}
        />
        <TouchableOpacity style={{ marginTop: 5 }}><Text style={{ textAlign: 'center' }}>שכחת סיסמא ? </Text></TouchableOpacity>
        <Button
          buttonColor={Colors.primary}
          mode="contained"
          onPress={() => { Validuser(email, password); }}
          style={Styles.login_btn}>
          <Text>התחבר</Text>
        </Button>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <Divider style={{ width: "40%", marginLeft: 20 }} />
          <Text style={{ paddingHorizontal: 15 }}>או</Text>
          <Divider style={{ width: "40%", marginRight: 20 }} />
        </View>
        <View style={Styles.btn_container}>
          <Button
            style={[Styles.input_btn]}
            textColor={Colors.black}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text>אין לך משתמש ? הרשם עכשיו !</Text>
          </Button>
          <Button icon={"google"} textColor={Colors.black} buttonColor={Colors.transparent} style={[Styles.input_btn]}>
            <Text>התחבר עם גוגל</Text>
          </Button>
          <Button
            style={[Styles.button, Styles.input_btn]}
            onPress={() => {
              clearOnboarding();
            }}
          >
            <Text>אנבורדינג</Text>
          </Button>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("FastReport");
            }}
          >
            <Text style={{ color: "#B5B4B4" }}>דווח כאנונימי</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const Styles = StyleSheet.create({
  continer: {
    backgroundColor: Colors.white,
    height: "100%",
  },
  logo: {
    width: 180,
    height: 180,
    marginHorizontal: "28%",
  },
  btn_container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 15
  },
  input_btn: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    width: "80%",
    fontSize: fontSizes.S,
  },
  login_input: {
    width: "65%",
    textAlign: "right",
    direction: "rtl",
    marginHorizontal: 70,
    backgroundColor: Colors.white,
    marginVertical: 5
  },
  login_btn: {
    margin: 25,
    width: "30%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 5,
    borderRadius: 2,
  },
});
