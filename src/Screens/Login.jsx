import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Divider, TextInput } from "react-native-paper";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors, fontSizes } from "../style/AllStyels";
import * as Location from "expo-location";
import { APIContext } from "../Context/APIContext";
import * as WebBroswer from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBroswer.maybeCompleteAuthSession();

export default function Login({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "815047920130-66fqvk7sj091egq4s70hm8ng581r14u3.apps.googleusercontent.com",
    iosClientId:
      "815047920130-c5fjpr4kufvvfbe9ubnbpv4f0q6p4t5t.apps.googleusercontent.com",
    webClientId:
      "815047920130-rcjgnkiuq63jsvjh0ohoqm044vl1i3tl.apps.googleusercontent.com",
    expoClientId:
      "815047920130-rcjgnkiuq63jsvjh0ohoqm044vl1i3tl.apps.googleusercontent.com"
    //redirectUri: "https://auth.expo.io/@nirizhak15/SmokEye/start"
  },
    {
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth", // Add this line
    });
  const { setEmail, setPassword, email, password, setCurrentLocation } =
    useContext(SmokeyeContext);
  const { ConfirmClient, setLatitude, setLongitude, setLocation, allUsers, setCurrentUser, InsertNewUser } =
    useContext(APIContext);
  const handlePress = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (token) {
      getUserInfo(); 
    }
  }, [token]);

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      setToken(authentication?.accessToken);
    }
  }, [response]);

  const getUserInfo = async () => {
    const res = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + token
    );
    const response = await res.json();
    setUserInfo(response);
    let emailInDb = allUsers.some((e)=>e.email === response.email)
    if(!emailInDb){
      let newUser = {
        firstName: `${response.given_name}`,
        lastName: `${response.family_name}`,
        email: `${response.email}`,
        password: ``,
        phone: ``,
        address: ``,
        role: "client",
        smoke: '',
        img: `${response.picture}`,
        isActive: true,
      }
      await InsertNewUser(newUser)
      console.log("added")
      setCurrentUser(newUser)
      navigation.navigate("userScreens");
    } else {
      let u = allUsers.filter((e)=>e.email === response.email)[0]; 
      setCurrentUser(u)
      navigation.navigate("userScreens");
    }
    return response;
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
      setCurrentLocation([
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
      ]);
    };
    getPermissions();
  }, []);

  const clearOnboarding = async () => {
    try {
      await AsyncStorage.removeItem("@viewedOnboarding");
      console.log("clear onboarding");
    } catch (err) {
      console.log("err clearonboarding", err);
    }
  };
  // chack who is the current user and his spicific role
  const Validuser = async (e, p) => {
    let role = await ConfirmClient(e, p);
    if (role == "client") {
      navigation.navigate("userScreens");
    } else if (role == "Regulator" || role == "Reasercher") {
      navigation.navigate("adminScreens");
    } else if (role == "storeAdmin") {
      navigation.navigate("storeAdmin");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={Styles.continer}>
        <View style={Styles.logo}>
          <Image source={require("../Images/logo.png")} resizeMode="center" />
        </View>
        <Text style={{ textAlign: "center", fontSize: 36 }}>התחברות</Text>
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
        <TouchableOpacity style={{ marginTop: 5 }}>
          <Text style={{ textAlign: "center" }}>שכחת סיסמא ? </Text>
        </TouchableOpacity>
        <Button
          buttonColor={Colors.primary}
          mode="contained"
          onPress={() => {
            Validuser(email, password);
          }}
          style={Styles.login_btn}
        >
          <Text>התחבר</Text>
        </Button>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            <Text>אין לך משתמש? הרשם עכשיו</Text>
          </Button>
          <Button
            onPress={() => token ? getUserInfo() : promptAsync()}
            textColor={Colors.black}
            buttonColor={Colors.transparent}
            style={[Styles.input_btn]}
          >
            <Text>כניסה עם גוגל</Text>
            <Image
              source={require("../Images/icons8-google-48.png")}
              style={{ width: 24, height: 24 }}
            ></Image>
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
    justifyContent: "center",
    width: 100,
    height: 100,
    marginHorizontal: -50,
    marginTop: 80,
  },
  btn_container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 15,
  },
  input_btn: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    width: "80%",
    fontSize: fontSizes.S,
  },
  login_input: {
    width: "70%",
    textAlign: "left",
    marginHorizontal: 60,
    backgroundColor: Colors.white,
    marginVertical: 5,
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
