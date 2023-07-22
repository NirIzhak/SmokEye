import {
  View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image, Alert, StyleSheet, SafeAreaView, ScrollView
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import React, { useEffect, useState, useContext } from "react";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import { APIContext } from "../Context/APIContext";
import { RadioButton, DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Colors, fontSizes } from "../style/AllStyels";


export default function NewReport() {
  const {
    ImageUploader,
    city,
    setCity,
    street,
    setStreet,
    streetNum,
    SetStreetNum,
    imageUri,
    setImageUri,
    des,
    setDes,
    setCurrentLocation,
    location,
    latitude,
    longitude,
  } = useContext(SmokeyeContext);
  const { setReport, report, InsertReport, currentUser } = useContext(APIContext)
  const date = new Date();

  const [checked, setChecked] = useState("Business");
  const [value, setValue] = useState(null);
  const [BusName, setBusName] = useState("");
  const [select, setSelect] = useState(false);
  const { extractStreetName } = useContext(SmokeyeContext);

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#F39508",
      accent: "#f1c40f",
    },
  };
  const data = [
    { label: "מסעדה", value: "מסעדה" },
    { label: "קניון", value: "קניון" },
    { label: "קולנוע", value: "אולם קולנוע" },
    { label: "פארק שעשועים", value: "פארק" },
    { label: "תאטרון", value: "תאטרון" },
    { label: "אולם הופעות", value: "אולם הופעות" },
  ];

  const handlePress = () => {
    Keyboard.dismiss();
  };


  const createReport = async () => {
    const imageLink = await ImageUploader(imageUri);
    await setReport({
      date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      type: `${checked}`,
      location: [
        `${latitude}`,
        `${longitude}`,
      ],
      address: { street: `${street}`, streetNum: `${streetNum}`, city: `${city}` },
      place: checked === "Business" ? `${BusName}` : `${value}`,
      details: `${des}`,
      image: `${imageLink}`,

    });
    console.log('bye :>> ');
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
  const GetAddress = async () => {
    try {
      const response = await fetch(
        `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?&key=RjOFc93hAGcOpbjZ0SnOV4TIzDTP1mz9`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );
      const result = await response.json();
      console.log(result);
      if (
        result.addresses[0].address.municipality == "" ||
        result.addresses[0].address.street == "" ||
        result.addresses[0].address.streetNumber == ""
      ) {
        alert(
          "לא היה ניתן למצוא את המיקום שלך, אנא מלא את פרטי המיקום באופן ידני"
        );
      } else {
        setCity(result.addresses[0].address.municipality);
        setStreet(extractStreetName(result.addresses[0].address.street));
        SetStreetNum(result.addresses[0].address.streetNumber);
      }
    } catch (error) {
      console.error(error);
    }
  };


  // useEffect(() => {
  //   const getPermissions = async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       console.log("Not Granted");
  //       return;
  //     }

  //     let currentLocation = await Location.getCurrentPositionAsync({});
  //     setLocation(currentLocation);
  //     console.log("Location:");
  //     console.log(currentLocation);
  //     setLatitude(currentLocation.coords.latitude);
  //     setLongitude(currentLocation.coords.longitude);
  //     console.log([currentLocation.coords.latitude , currentLocation.coords.longitude])
  //     setCurrentLocation([currentLocation.coords.latitude , currentLocation.coords.longitude])

  //   };
  //   getPermissions();
  // }, []);

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
                  <Text style={[styles.btn]}>בחר תמונה</Text>
                )}
              </TouchableOpacity>
              {imageUri && (
                <Image source={{ uri: `data:image/jpg;base64,${imageUri}` }} style={styles.img} />
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
        <ModalPoup visible={visible}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={ReturnTologinScreen}>
                <Image
                  source={{ uri: "https://cdn-icons-png.flaticon.com/512/67/67345.png?w=740&t=st=1685792830~exp=1685793430~hmac=8c346bf78fce79a22309a9833f9ca23399d7d2a51a3a91f450129e146e0acb5f" }}
                  style={styles.x_logo}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/1102/1102052.png?w=740&t=st=1685792426~exp=1685793026~hmac=dc4ad9d28be355423331316bbc9134a769239442102bee59e4438c3d243d7b3c" }}
              style={styles.success_logo}
            />
          </View>

          <Text style={styles.popUp_text}>
            דיווח נשלח בהצלחה !
          </Text>
        </ModalPoup>
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
