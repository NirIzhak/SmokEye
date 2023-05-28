import {View,Text,TextInput,TouchableOpacity,TouchableWithoutFeedback,Keyboard,Image,Alert,StyleSheet} from "react-native";
//import { SelectList } from 'react-native-dropdown-select-list'
import { Dropdown } from 'react-native-element-dropdown';
import React, { useEffect, useState, useRef, useContext } from "react";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import { RadioButton ,DefaultTheme, Provider as PaperProvider} from 'react-native-paper';




export default function NewReport() {

  const {city, setCity,street, setStreet,streetNum, SetStreetNum,imageUri, setImageUri,des, setDes} = useContext(SmokeyeContext);
  const date = new Date();
  const [location, setLocation] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [checked,setChecked] =useState('Business');
  const [value, setValue] = useState(null);
  const {extractStreetName} = useContext(SmokeyeContext);
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#F39508',
      accent: '#f1c40f',
    }
  }
  const data = [
    { label: 'מסעדה', value: '1' },
    { label: 'קניון', value: '2' },
    { label: 'קולנוע', value: '3' },
    { label: 'פארק שעשועים', value: '4' },
    { label: 'תאטרון', value: '5' },
    { label: 'אולם הופעות', value: '6' },
  ]

  const handlePress = () => {
    Keyboard.dismiss();
    console.log("close")
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

  const [select,setSelect] = useState(false);

  const ViewBus=()=>{
    return(
      <>
      <Text>בחר את מקום האירוע</Text>
     <Dropdown
      style={styles.dropdown}
      placeholderStyle={[styles.placeholderStyle]}
      selectedTextStyle={[styles.selectedTextStyle]}
      inputSearchStyle={[styles.inputSearchStyle]}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={250}
      labelField="label"
      valueField="value"
      placeholder="בחר מקום"
      searchPlaceholder="חפש כאן..."
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
    /> 
      </>
    )
  }
  const ViewPrivate=()=>{
    return(
      <View></View>
    )
  }
  useEffect(()=>{
    if(checked == 'Business'){
      console.log('Business :>> ');
      setSelect(true);
    }
    else{
      console.log('Private :>> ');
      setSelect(false);
    }
  })

  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <Text style={[styles.title]}>
            על מה הדיווח?
          </Text>
          <View style={styles.radio_btn}>
            <View style={styles.radioButtonContainer}>
             <RadioButton.Android
               value="Business"
               status={ checked === 'Business' ? 'checked' : 'unchecked' }
               onPress={() => setChecked('Business')}
               color={theme.colors.primary}
            />
          <Text style={styles.radioButtonText}>עסק בו הסיגריות בגלוי</Text>
      </View>
       <View style={styles.radioButtonContainer}>
         <RadioButton.Android
           value="Private"
           status={ checked === 'Private' ? 'checked' : 'unchecked'}
           onPress={() => setChecked('Private')}
         />
      <Text style={styles.radioButtonText}>עישון במקום לא חוקי</Text>
    </View>
    </View>
    <View>
      {select ? ViewBus() : ViewPrivate()}
    </View>
          <Text style={[styles.title]}>
            פרט בקצרה על המקרה
          </Text>
          <TextInput
            placeholder="לדוגמא: עסק שמוכר סיגריות שנראות באופן גלוי"
            multiline
            numberOfLines={3}
            onBlur={handlePress}
            onChangeText={(text) => setDes(text)}
            style={[styles.report_Details]}
          />
          <TouchableOpacity onPress={createTwoButtonAlert} style={styles.buttonContainer} >
            {imageUri ? <Text style={[styles.btn]}>החלף תמונה</Text> : <Text style={[styles.btn]}>בחר תמונה</Text>}
          </TouchableOpacity>
          {imageUri && (
            <Image source={{ uri: imageUri }}style={styles.img}/>)}
          <View style={styles.date}>
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
              placeholder="מספר"
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
          {latitude && longitude ? (
        <TouchableOpacity onPress={GetAddress} style={styles.buttonContainer}>
          <Text style={styles.btn}>מצא אותי !</Text>
        </TouchableOpacity>
      ) : null}
          </View>
          <View>
            <Text style={styles.sendReport} onPress={()=>{
              // console.log("des ===> ",  des);
              // console.log("time ===> ",  date.getHours().toString().padStart(2, "0") +
              // ":" +
              // date.getMinutes().toString().padStart(2, "0"));
              // console.log("date ===> ",  date.getDate() +
              //   "/" +
              //   (date.getMonth() + 1) +
              //   "/" +
              //   date.getFullYear());              
              //   console.log("report on ===> " + checked)
              //   console.log("StreetName ===> "+ street)
              //   console.log("StreetNum ===> " + streetNum)
              //   console.log("city ===> " + city)
              //   console.log("location ===> " + latitude, longitude)
              //   console.log("image ===> " + imageUri)
                const newReport = {
                  "description": des,
                "media": imageUri,
                "location": [
                  latitude,
                  longitude
                ],
                "address": street + " " + streetNum + "," + city,
                "date": date.getDate() +
                "/" +
                (date.getMonth() + 1) +
                "/" +
                date.getFullYear() + "," + date.getHours().toString().padStart(2, "0") +
                ":" +
                date.getMinutes().toString().padStart(2, "0")
              }
              console.log(newReport)
            }}>דווח</Text>
          </View>
        </View>
        </PaperProvider>
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
    borderRadius:5,
    width:'85%',
    padding:15,
    direction: 'rtl',
    textAlignVertical: 'top',
    textAlign: 'right'
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
  buttonContainer:{
    marginTop:20,
    backgroundColor: "#F39508",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 40
  },
  btn:{
    color:'white',
    width:'100%'
  },
  img:{
      width: 200,
      height: 200,
      alignSelf: "center",
      marginTop: 10
  },
  date:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 40,
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
    borderRadius:5,
    padding: 5,
    textAlign: 'right',
    margin:2
  },
  streetInput: {
    width: '40%',
  },
  streetNumInput: {
    textAlign:'center',
    width: '15%',
  },
  cityInput: {
    width: '30%',
  },
  sendReport:{
    borderWidth:1,
    borderStyle:'solid',
    borderColor:'#F39508',
    marginTop:5,
    paddingHorizontal:50
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40
  },
  basic_fontSize:{
    fontSize: 16
  }
})
