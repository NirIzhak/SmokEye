import {View,Text,TextInput,TouchableOpacity,TouchableWithoutFeedback,Keyboard,Image,Alert,StyleSheet, SafeAreaView} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import React, { useEffect, useState, useContext } from "react";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import { RadioButton ,DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import { Colors,fontSizes } from "../style/AllStyels";



export default function NewReport() {

  const {currentUser,insertReport,setReport,city, setCity,street, setStreet,streetNum, SetStreetNum,imageUri, setImageUri,des, setDes} = useContext(SmokeyeContext);
  const date = new Date();
  const [location, setLocation] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [checked,setChecked] =useState('Business');
  const [value, setValue] = useState(null);
  const [BusName,setBusName] = useState('');
  const [select,setSelect] = useState(false);
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
    { label: 'מסעדה', value: 'Resturant' },
    { label: 'קניון', value: 'Mall' },
    { label: 'קולנוע', value: 'Cinema' },
    { label: 'פארק שעשועים', value: 'Park' },
    { label: 'תאטרון', value: 'Theater' },
    { label: 'אולם הופעות', value: 'Hall' },
  ]

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
      if(result.addresses[0].address.municipality == "" || result.addresses[0].address.street == "" ||  result.addresses[0].address.streetNumber == ""){
        alert("לא היה ניתן למצוא את המיקום שלך, אנא מלא את פרטי המיקום באופן ידני")
      }
      else{
        setCity(result.addresses[0].address.municipality);
        setStreet(extractStreetName(result.addresses[0].address.street));
        SetStreetNum(result.addresses[0].address.streetNumber)
      }
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

  const ViewBus=()=>{
    return(
      <>
      <Text>בחר את מקום האירוע</Text>
     <Dropdown
      style={styles.dropdown}
      placeholderStyle={[styles.basic_fontSize]}
      selectedTextStyle={[styles.basic_fontSize]}
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
      <>
      <Text>הוסיפו את שם העסק</Text>
        <TextInput style={[styles.report_Bus,styles.input_Text]} onChangeText={(text) => setBusName(text)}></TextInput>
      </> 
    )
  }
  useEffect(()=>{
    if(checked == 'Business'){
      setSelect(false);
    }
    else{
      setSelect(true);
    }
  })

  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
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
            onBlur={handlePress}
            onChangeText={(text) => setDes(text)}
            style={[styles.report_Details,styles.input_Text]}
          />
          <TouchableOpacity onPress={createTwoButtonAlert} style={styles.buttonContainer} >
            {imageUri ? <Text style={[styles.btn]}>החלף תמונה</Text> : <Text style={[styles.btn]}>בחר תמונה</Text>}
          </TouchableOpacity>
          {imageUri && (
            <Image source={{ uri: imageUri }}style={styles.img}/>)}
          {/* <View style={styles.date}>
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
          </View> */}
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
                date.getMinutes().toString().padStart(2, "0"),
                "type" : checked,
                "place" : checked === "Business" ? BusName : value,
                "reporter":currentUser.firstName + " " + currentUser.lastName
              }
              setReport(newReport);
              insertReport(currentUser.email,report);
            }}>דווח</Text>
          </View>
        </SafeAreaView>
        </PaperProvider>
      </TouchableWithoutFeedback>
    </>
  );
}
const styles = StyleSheet.create({
  basic_fontSize:{
    fontSize: fontSizes.S
  },
  input_Text:{
    borderColor:Colors.borderColor,
    borderWidth:1,
    borderRadius:5,
    padding:5,
  },
  title:{
    marginBottom:10, 
    marginTop: 50,
    textAlign:"center"
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    textAlign: 'right'
  },
  report_Details:{
    width:'85%',
    textAlignVertical: 'top',
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
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 40
  },
  btn:{
    color:Colors.white,
  },
  img:{
      width: 200,
      height: 200,
      alignSelf: "center",
      marginTop: 10
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginBottom: 20,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius:5,
    padding: 5,
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
    borderColor:Colors.primary,
    marginTop:5,
    paddingHorizontal:50
  },
  report_Bus:{
    textAlignVertical: 'center'  
  },
  dropdown: {
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingHorizontal: 15,
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
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40
  },
   /*date:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 40,
  },*/
})
