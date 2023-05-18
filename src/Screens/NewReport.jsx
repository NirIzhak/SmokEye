import {View,Text,TextInput,TouchableOpacity,TouchableWithoutFeedback,Keyboard,Image,Alert,StyleSheet} from "react-native";
import React, { useEffect, useState, useRef, useContext } from "react";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import { RadioButton } from 'react-native-paper';


export default function NewReport() {
  const date = new Date();
  const [location, setLocation] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [streetNum, SetStreetNum] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [des, setDes] = useState("")
  const [checked,setChecked] =useState('first');
  const {extractStreetName} = useContext(SmokeyeContext)

  const handlePress = () => {
    Keyboard.dismiss();
  };
//Camera
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
  const createTwoButtonAlert = () =>
  Alert.alert('הוספת תמונה', 'בחר אחת מן האופציות', [
    {
      text: 'העלאת תמונה מהאלבום',
      onPress: () => handleChooseImage(),
    },
    {text: 'העלאת תמונה חדשה מהמצלמה', onPress: () => openCamera()},
  ]);
//location
  const GetAddress = async () => {
    try {
      const response = await fetch(`https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?&key=RjOFc93hAGcOpbjZ0SnOV4TIzDTP1mz9`, {
        headers: {
          Accept: "*/*"
        }
      });
      const result = await response.json();
      console.log(result)
      setCity(result.addresses[0].address.municipality);
      setStreet(extractStreetName(result.addresses[0].address.street));
      SetStreetNum(result.addresses[0].address.streetNumber)
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
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
          <Text style={[styles.title]}>
            על מה הדיווח?
          </Text>
          <View style={styles.radio_btn}>
            <View style={styles.radioButtonContainer}>
             <RadioButton
               value="first"
               status={ checked === 'first' ? 'checked' : 'unchecked' }
               onPress={() => setChecked('first')}
            />
          <Text style={styles.radioButtonText}>עסק</Text>
      </View>
       <View style={styles.radioButtonContainer}>
         <RadioButton
           value="second"
           status={ checked === 'second' ? 'checked' : 'unchecked' }
           onPress={() => setChecked('second')}
         />
      <Text style={styles.radioButtonText}>אחר</Text>
    </View>
    </View>

          <Text style={[styles.title]}>
            פרט בקצרה על המקרה
          </Text>
          <TextInput
            placeholder="לדוגמא:
        עישון במקום לא חוקי
          חנות שמוכרת בניגוד לחוק"
            multiline
            numberOfLines={3}
            onChangeText={(text) => setDes(text)}
            style={[styles.report_Details]}
          />
          <TouchableOpacity onPress={createTwoButtonAlert} style={{ marginTop: 40 }} >
            {imageUri ? <Text style={styles.title}>החלף תמונה</Text> : <Text style={{textAlign: 'center'}}>בחר תמונה</Text>}
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
              <Text style={styles.title}>תאריך</Text>
              <Text style={styles.title}>
                {date.getDate() +
                  "/" +
                  (date.getMonth() + 1) +
                  "/" +
                  date.getFullYear()}
              </Text>
            </View>
            <View>
              <Text style={styles.title}>שעה</Text>
              <Text style={styles.title}>
                {date.getHours().toString().padStart(2, "0") +
                  ":" +
                  date.getMinutes().toString().padStart(2, "0")}
              </Text>
            </View>
          </View>
          <Text style={styles.title}>פרטי מיקום:</Text>
          <View style={styles.addressContainer}>
            <TextInput
              placeholder="שם הרחוב"
              defaultValue={street}
              style={[styles.addressInput, styles.streetInput]}
            />
            <TextInput
              placeholder="מספר רחוב"
              defaultValue={streetNum}
              style={[styles.addressInput, styles.streetNumInput]}
            />
            <TextInput
              placeholder="עיר"
              defaultValue={city}
              style={[styles.addressInput, styles.cityInput]}
            />
          </View>
          <View>
          <TouchableOpacity
              onPress={() => {
                GetAddress();
              }}
            >
              <Text style={styles.title}>
                השתמש במיקום שלי!
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
const styles = StyleSheet.create({
  title:{
    marginBottom:10, 
    textAlign:"center"
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    margin:'auto'
  },
  report_Details:{
    borderColor: "#8C8A89",
    borderWidth:1,
    width:'75%',
    padding:15,
    direction: 'rtl',
    textAlignVertical: 'top'
  },
  radio_btn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  radioButtonText: {
    marginLeft: 5,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginBottom: 20,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#8C8A89',
    padding: 5,
    textAlign: 'right',
    margin:2
  },
  streetInput: {
    width: '40%',
  },
  streetNumInput: {
    width: '10%',
  },
  cityInput: {
    width: '30%',
  }
})
