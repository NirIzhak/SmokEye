import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";

export default function NewReport() {
  const date = new Date();
  const [location, setLocation] = useState({});
  const [addressInfo, setAddressInfo] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");

  const handlePress = () => {
    Keyboard.dismiss();
  };

  const GetAddress = async () => {
    const url = `https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi?lat=${latitude}&lng=${longitude}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "11a0f318a4msh5d32c1a19d99036p144455jsn538c51d6c8f1",
        "X-RapidAPI-Host": "address-from-to-latitude-longitude.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      setAddressInfo(result);
      setAddress(result.Results[0].address);

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


 

  return (
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
        <Text style={{ textAlign: "center" }}>כתובת:</Text>
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
          <Text style={{ textAlign: "center", marginTop: 10 }}>מצא כתובת</Text>
        </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}
