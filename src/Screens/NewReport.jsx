import {
  View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image, Alert, StyleSheet, SafeAreaView, ScrollView
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import React, { useEffect, useState, useContext } from "react";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import { APIContext } from "../Context/APIContext";
import { RadioButton, Provider as PaperProvider } from "react-native-paper";
import { theme } from "../style/AllStyels";
import { Colors, fontSizes } from "../style/AllStyels";


export default function NewReport() {
  const { imageUri, setImageUri, des, setDes, setCurrentLocation,
  } = useContext(SmokeyeContext);
  const { city, setCity, street, setStreet, streetNum, SetStreetNum, ImageUploader, setReport, report, InsertReport, currentUser, GetAddress, latitude, longitude } = useContext(APIContext)
  const date = new Date();

  const [checked, setChecked] = useState("Business");
  const [value, setValue] = useState(null);
  const [BusName, setBusName] = useState("");
  const [select, setSelect] = useState(false);
  const { data } = useContext(SmokeyeContext);



  const handlePress = () => {
    Keyboard.dismiss();
  };


  const createReport = async () => {
    const locationFromAddress = await GetLocationByAddress(street, streetNum, city);
    const imageLink = await ImageUploader(imageUri);
    // add get location from address! ----- IMPORTENT
    await setReport({
      date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      type: `${checked}`,
      location: [
        `${locationFromAddress.lat || latitude}`,
        `${locationFromAddress.lon || longitude}`,
      ],
      address: [{ street: `${street}`, streetNum: `${streetNum}`, city: `${city}` }],
      place: checked === "Business" ? `${BusName}` : `${value}`,
      details: `${des}`,
      image: `${imageLink}`,
    });
  };
  useEffect(() => {
    if (!report) return;
    InsertReport(report, currentUser.email);
  }, [report]);

  //Camera
  const openCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the camera is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync({ base64: true, quality: 1.0 });

    if (!pickerResult.cancelled) {
      await setImageUri(pickerResult.assets[0].base64);
    }
  };

  const handleChooseImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 1.0 });

    if (!pickerResult.cancelled) {
      setImageUri(pickerResult.assets[0].base64);
    }
  };
  const createTwoButtonAlert = () =>
    Alert.alert("הוספת תמונה", "בחר אחת מן האופציות", [
      {
        text: "העלאת תמונה מהאלבום",
        onPress: () => handleChooseImage(),
      },
      { text: "העלאת תמונה חדשה מהמצלמה", onPress: () => openCamera() },
    ]);
  //location



  const GetLocationByAddress = async(street, num, city)=>{
    try{
      let res = await fetch(`https://api.tomtom.com/search/2/structuredGeocode.json?key=RjOFc93hAGcOpbjZ0SnOV4TIzDTP1mz9&countryCode=IL&limit=10&ofss=0&streetNumber=${num}&streetName=${street}&municipality=${city}`);
      let data = await res.json();
      return{
        lon: data.results[0].position.lon,
        lat: data.results[0].position.lat
      }
    }catch(err){
      console.log(err)
    }
  }

  const ViewBus = () => {
    return (
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
          onChange={(item) => {
            setValue(item.value);
          }}
        />
      </>
    );
  };
  const ViewPrivate = () => {
    return (
      <>
        <Text>הוסיפו את שם העסק</Text>
        <TextInput
          style={[styles.report_Bus, styles.input_Text]}
          onChangeText={(text) => setBusName(text)}
        ></TextInput>
      </>
    );
  };
  useEffect(() => {
    if (checked == "Business") {
      setSelect(false);
    } else {
      setSelect(true);
    }
  });

  return (
    <>
      <ScrollView>
        <TouchableWithoutFeedback onPress={handlePress}>
          <PaperProvider theme={theme}>
            <View style={styles.container}>
              <Text style={[styles.title]}> על מה הדיווח?</Text>
              <View style={styles.radio_btn}>
                <View style={styles.radioButtonContainer}>
                  <RadioButton.Android
                    value="Business"
                    status={checked === "Business" ? "checked" : "unchecked"}
                    onPress={() => setChecked("Business")}
                    color={theme.colors.primary}
                  />
                  <Text style={styles.radioButtonText}>
                    עסק בו הסיגריות בגלוי
                  </Text>
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton.Android
                    value="Private"
                    status={checked === "Private" ? "checked" : "unchecked"}
                    onPress={() => setChecked("Private")}
                  />
                  <Text style={styles.radioButtonText}>עישון במקום לא חוקי</Text>
                </View>
              </View>
              <View>{select ? ViewBus() : ViewPrivate()}</View>
              <Text style={[styles.title]}> פרט בקצרה על המקרה </Text>
              <TextInput
                placeholder="לדוגמא: עסק שמוכר סיגריות שנראות באופן גלוי"
                onBlur={handlePress}
                onChangeText={(text) => setDes(text)}
                style={[styles.report_Details, styles.input_Text]}
              />
              <TouchableOpacity
                onPress={createTwoButtonAlert}
                style={styles.buttonContainer}
              >
                {imageUri ? (
                  <Text style={[styles.btn]}>החלף תמונה</Text>
                ) : (
                  <Text style={[styles.btn]}>העלאת תמונה</Text>
                )}
              </TouchableOpacity>
              {imageUri && (
                <Text>נבחרה תמונה!</Text>
              )}
              <Text style={styles.title}>פרטי מיקום:</Text>
              <View style={styles.addressContainer}>
                <TextInput
                  placeholder="שם הרחוב"
                  defaultValue={street}
                  onChangeText={(text) => setStreet(text)}
                  style={[styles.addressInput, styles.streetInput]}
                />
                <TextInput
                  placeholder="מספר"
                  defaultValue={streetNum}
                  onChangeText={(text) => SetStreetNum(text)}
                  style={[styles.addressInput, styles.streetNumInput]}
                />
                <TextInput
                  placeholder="עיר"
                  defaultValue={city}
                  onChangeText={(text) => setCity(text)}
                  style={[styles.addressInput, styles.cityInput]}
                />
              </View>
              <View>
                {latitude && longitude ? (
                  <TouchableOpacity
                    onPress={GetAddress}
                    style={styles.buttonContainer}
                  >
                    <Text style={styles.btn}>מצא אותי !</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <View>
                <Text
                  style={styles.sendReport}
                  onPress={() => {
                    createReport();
                  }}
                >
                  דווח
                </Text>
              </View>
            </View>
          </PaperProvider>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  basic_fontSize: {
    fontSize: fontSizes.S,
  },
  input_Text: {
    borderColor: Colors.borderColor,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  title: {
    marginBottom: 10,
    marginTop: 50,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "right",
  },
  report_Details: {
    width: "85%",
    textAlignVertical: "top",
  },
  radio_btn: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  radioButtonText: {
    marginLeft: 5,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  btn: {
    color: Colors.white,
  },
  img: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 10,
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
    marginBottom: 20,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 5,
    padding: 5,
    margin: 2,
  },
  streetInput: {
    width: "40%",
  },
  streetNumInput: {
    textAlign: "center",
    width: "15%",
  },
  cityInput: {
    width: "30%",
  },
  sendReport: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.primary,
    marginTop: 5,
    paddingHorizontal: 50,
  },
  report_Bus: {
    textAlignVertical: "center",
  },
  dropdown: {
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingHorizontal: 15,
    shadowColor: "#000",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
  },
});
