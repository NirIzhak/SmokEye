import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert
} from "react-native";
import React, { useEffect, useState, useRef, useContext } from "react";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { SmokeyeContext } from "../Context/SmokEyeContext";



export default function NewReport() {
  const date = new Date();
  const [location, setLocation] = useState({});
  const [addressInfo, setAddressInfo] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [des, setDes] = useState("")

  const {extractStreetName} = useContext(SmokeyeContext)


  const openCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("Permission to access the camera is required!");
      return;
    }
  
    let pickerResult = await ImagePicker.launchCameraAsync();
  
    if (!pickerResult.cancelled) {
      setImageUri(pickerResult.uri);
    }
  };



  const handleChooseImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.cancelled) {
      setImageUri(pickerResult.uri);
    }
  };

  const handlePress = () => {
    Keyboard.dismiss();
  };

  const GetAddress = async () => {
    try {
      const response = await fetch("https://api.tomtom.com/search/2/reverseGeocode/32.929976075800624%2C35.08836002062856.json?&key=RjOFc93hAGcOpbjZ0SnOV4TIzDTP1mz9", {
        headers: {
          Accept: "*/*"
        }
      });
      const result = await response.json();
      //console.log(result);
      console.log(result.addresses[0].address.streetNameAndNumber);
      setAddressInfo(result.addresses[0]);
      setAddress(result.addresses[0].address.streetNameAndNumber);
    } catch (error) {
      console.error(error);
    }
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
      console.log("Location:");
      console.log(currentLocation);
      setLatitude(currentLocation.coords.latitude);
      setLongitude(currentLocation.coords.longitude);
    };
    getPermissions();
  }, []);


  const createTwoButtonAlert = () =>
    Alert.alert('הוספת תמונה', 'בחר אחת מן האופציות', [
      {
        text: 'העלאת תמונה מהאלבום',
        onPress: () => handleChooseImage(),
      },
      {text: 'העלאת תמונה חדשה מהמצלמה', onPress: () => openCamera()},
    ]);

  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
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
            onChangeText={(text) => setDes(text)}
            style={{
              borderBottomWidth: 1,
              width: "60%",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "right",
            }}
          />

          <TouchableOpacity onPress={createTwoButtonAlert} style={{ marginTop: 40 }} >
            {imageUri ? <Text style={{textAlign: 'center'}}>החלף תמונה</Text> : <Text style={{textAlign: 'center'}}>בחר תמונה</Text>}
          </TouchableOpacity>

          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{
                width: 200,
                height: 200,
                alignSelf: "center",
                marginTop: 10,
              }}
            />
          )}

        
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
              <Text style={{ textAlign: "center" }}>
                {date.getDate() +
                  "/" +
                  (date.getMonth() + 1) +
                  "/" +
                  date.getFullYear()}
              </Text>
            </View>
            <View>
              <Text style={{ textAlign: "center" }}>שעה</Text>
              <Text style={{ textAlign: "center" }}>
                {date.getHours().toString().padStart(2, "0") +
                  ":" +
                  date.getMinutes().toString().padStart(2, "0")}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ textAlign: "center", }}>כתובת:</Text>
            <TextInput
              placeholder="כתובת מלאה"
              defaultValue={address}
              style={{
                borderBottomWidth: 1,
                width: "30%",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "right",
              }}
            />
            <TouchableOpacity
              onPress={() => {
                GetAddress();
              }}
            >
              <Text style={{ textAlign: "center", marginTop: 10 }}>
                מצא כתובת
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text onPress={()=>{
              console.log("des ===> ",  des);
              console.log("time ===> ",  date.getHours().toString().padStart(2, "0") +
              ":" +
              date.getMinutes().toString().padStart(2, "0"));
              console.log("date ===> ",  date.getDate() +
                "/" +
                (date.getMonth() + 1) +
                "/" +
                date.getFullYear());              
            }}>דווח</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}
