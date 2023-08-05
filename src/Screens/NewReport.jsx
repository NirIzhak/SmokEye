import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image, Alert, StyleSheet, Button, ScrollView, Modal } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import React, { useEffect, useState, useContext } from "react";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import { APIContext } from "../Context/APIContext";
import { RadioButton, Provider as PaperProvider } from "react-native-paper";
import { theme, Colors, fontSizes } from "../style/AllStyels";
import { Popstyles } from "../style/PopUpModal";

export default function NewReport() {

  const { data, imageUri, setImageUri, des, setDes } = useContext(SmokeyeContext);
  const { popMsgReport, setpopMsgReport, city, setCity, street, setStreet, streetNum, SetStreetNum, ImageUploader, setReport, report, InsertReport, currentUser, latitude, longitude, GetAddress, GetLocationByAddress } = useContext(APIContext);
  const date = new Date();

  const [checked, setChecked] = useState("Business");
  const [value, setValue] = useState(null);
  const [BusName, setBusName] = useState("");
  const [select, setSelect] = useState(false);

  const handlePress = () => {
    Keyboard.dismiss();
  };
  const hidePopupModal = () => {
    setpopMsgReport(false);
  }
  //creating ner report
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
  //check new report
  useEffect(() => {
    if (!report) return;
    InsertReport(report, currentUser.email);
  }, [report]);

  //Camera function 
  //taking picture from camera
  const openCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the camera is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync({ base64: true, quality: 1.0 });

    if (!pickerResult.canceled) {
      await setImageUri(pickerResult.assets[0].base64);
    }
  };
  //ask for permisstion
  const handleChooseImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 1.0 });

    if (!pickerResult.canceled) {
      setImageUri(pickerResult.assets[0].base64);
    }
  };
  //show two choises button
  const createTwoButtonAlert = () =>
    Alert.alert("הוספת תמונה", "בחר אחת מן האופציות", [
      {
        text: "העלאת תמונה מהאלבום",
        onPress: () => handleChooseImage(),
      },
      { text: "העלאת תמונה חדשה מהמצלמה", onPress: () => openCamera() },
    ]);

  //show dropdown
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
          maxHeight={300}
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
  //show Business field/*[styles.report_Bus, styles.input_Text]*/
  const ViewPrivate = () => {
    return (
      <>
        <Text style={{ fontWeight: "bold" }}>הוסיפו את שם העסק</Text>
        <TextInput
          style={styles.Private_input}
          onChangeText={(text) => setBusName(text)}
        >
        </TextInput>
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
      <TouchableWithoutFeedback onPress={handlePress}>
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            <Text style={[styles.title, { fontSize: fontSizes.XL }]}> על מה הדיווח?</Text>
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
              multiline
              numberOfLines={4}
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
              ) : <Text>זיהה את מיקומך ? ניתן להכניס ידנית </Text>
              }
            </View>
            <View style={styles.sendReport}>
              <Button
                color={Colors.primary}
                title="דווח"
                onPress={() => {
                  createReport();
                }}
              >

              </Button>
            </View>
          </View>
        </PaperProvider>
      </TouchableWithoutFeedback>
      {
        popMsgReport ?
          <>
            <View>
              <Modal
                visible={popMsgReport}
                animationType="fade"
                transparent={true}
                onRequestClose={hidePopupModal}
              >
                <View style={Popstyles.modalContainer}>
                  <View style={Popstyles.modalContent}>
                    <Text style={Popstyles.messageText}>דיווח נשלח בהצלחה ! </Text>
                    <View style={{ alignItems: 'center' }}>
                      <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/1102/1102355.png?w=740&t=st=1690886025~exp=1690886625~hmac=5516a06b0266fe418d8604dcc0fc5935f96153877b94db73796af0874f383cd5" }} style={{
                        height: 180,
                        width: 180,
                      }}></Image>
                    </View>
                    <TouchableOpacity onPress={hidePopupModal}>
                      <Text style={Popstyles.closeButton}>סגור</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </>
          :
          null
      }
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    height: "100%"
  },
  title: {
    marginBottom: 10,
    marginTop: 50,
    textAlign: "center",
    fontWeight: "bold"
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  radio_btn: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  radioButtonText: {
    marginLeft: 5,
  },
  Private_input: {
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
    marginTop: 15,
    textAlign: 'right'
  },
  input_Text: {
    borderColor: Colors.borderColor,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    direction: "rtl"
  },
  report_Details: {
    width: "85%",
    textAlignVertical: "top",
  },

  buttonContainer: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 40,
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
    borderBottomColor: Colors.black,
    borderBottomWidth: 2,
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
    marginTop: 10,
  },
  report_Bus: {
    textAlignVertical: "center",
  },
  dropdown: {
    textAlign: 'right',
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingHorizontal: 2,
    width: 200,
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
  basic_fontSize: {
    fontSize: fontSizes.S,
  },
  btn: {
    color: Colors.white,
  },
});
