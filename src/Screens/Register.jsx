import { Text, View, StyleSheet, Switch, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Image, Modal, Alert, ScrollView } from "react-native";
import { useContext, useState, useEffect } from "react";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import { Colors, fontSizes } from "../style/AllStyels";
import { APIContext } from "../Context/APIContext";
import * as ImagePicker from "expo-image-picker";
import { Popstyles } from "../style/PopUpModal";
import { Button, TextInput } from "react-native-paper";
export default function Register({ navigation }) {

  const [tempUser, setTempuser] = useState();
  const [photo, setPhoto] = useState(null);
  const { email, password, phone, address, setPassword, setFirstName, setlastName, setEmail, setPhone, setAddress, toggleSwitch, smoke, firstName, lastName } = useContext(SmokeyeContext);
  const { visible, setVisible, InsertNewUser, ImageUploader } = useContext(APIContext);



  function checkNameValidity(name) {
    name = name.trim();
    if (name.length >= 2) {
      return true;
    } else {
      return false;
    }
  }

  function checkEmailValidity(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailPattern.test(email);
  }


  function checkPasswordLength(password) {
    if (password.length >= 6) {
      return true;
    } else {
      return false;
    }
  }

  function checkStringForDigits(str) {
    const digitPattern = /^\d{10}$/;

    return digitPattern.test(str);
  }

  const hidePopupModal = () => {
    setVisible(false);
  }
  //camera
  const createTwoButtonAlert = () =>
    Alert.alert("הוספת תמונה", "הוספת תמונת פרופיל", [
      {
        text: "העלאת תמונה מהאלבום",
        onPress: () => handleChooseImage(),
      },
    ]);

  const handleChooseImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 1.0,
    });

    if (!pickerResult.canceled) {
      setPhoto(pickerResult.assets[0].base64);
    }
  };
  //Add client
  const AddClient = async () => {
    if (checkNameValidity(firstName) && checkNameValidity(lastName) && checkEmailValidity(email) && checkPasswordLength(password) && checkStringForDigits(phone) && checkNameValidity(address) && photo) {

      const imageLink = await ImageUploader(photo);
      setTempuser({
        firstName: `${firstName}`,
        lastName: `${lastName}`,
        email: `${email}`.toLowerCase(),
        password: `${password}`,
        phone: `${phone}`,
        address: `${address}`,
        role: "client",
        smoke: smoke,
        img: imageLink,
        isActive: true,
      });
    } else {
      alert("אנא וודא את כל הפרטים, נראה כי משהו לא תקין")
    }
  };

  const ReturnTologinScreen = () => {
    navigation.navigate("Login");
    setVisible(false);
  };


  //check singal user (temp)
  useEffect(() => {
    if (!tempUser) return;
    else {
      console.log("tempUser :>> ", tempUser);
      InsertNewUser(tempUser);
      setTempuser();
    }
  }, [tempUser]);

  const handlePress = () => {
    Keyboard.dismiss();
  };
  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView onPress={handlePress}>
          <View style={styles.container}>
            <View>
              <Text style={styles.h1_title}>הרשמה</Text>
            </View>
            <View style={styles.rowInputConteiner}>
              <TextInput
                activeOutlineColor={Colors.primary}
                style={styles.input2}
                mode="outlined"
                label="שם פרטי"
                onChangeText={(text) => setFirstName(text)}
              />
              <TextInput
                activeOutlineColor={Colors.primary}
                mode="outlined"
                style={styles.input2}
                label="שם משפחה"
                onChangeText={(text) => setlastName(text)}
              />
            </View>
            <TextInput
              activeOutlineColor={Colors.primary}
              mode="outlined"
              style={styles.input}
              label="Email"
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
            <TextInput
              activeOutlineColor={Colors.primary}
              secureTextEntry={true} 
              mode="outlined"
              style={styles.input}
              label="סיסמא"
              onChangeText={(text) => setPassword(text)}
            />
            <TextInput
              activeOutlineColor={Colors.primary}
              mode="outlined"
              style={styles.input}
              label="פלאפון"
              onChangeText={(text) => setPhone(text)}
              keyboardType="phone-pad"
            />
            <TextInput
              activeOutlineColor={Colors.primary}
              mode="outlined"
              style={styles.input}
              label="כתובת"
              onChangeText={(text) => setAddress(text)}
            />
            <TouchableOpacity style={styles.button2} onPress={createTwoButtonAlert}>
              {photo ? (
                <Text style={[styles.title, { fontSize: fontSizes.M }]}>התמונה עלתה!</Text>
              ) : (
                <Text style={[styles.title, { fontSize: fontSizes.S }]}>העלאת תמונה</Text>
              )}
            </TouchableOpacity>

            <View style={styles.smoke_comtiner}>
              <Text style={styles.title}>לא מעשן</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#7CC69E" }}
                thumbColor={smoke ? "#5CEE9F" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={smoke}
                style={{ margin: 10 }}
              />
              <Text style={styles.title}>מעשן</Text>
            </View>
            <TouchableOpacity onPress={AddClient} style={styles.button}>
              <Text style={styles.title}>הרשם</Text>
            </TouchableOpacity>
            {
              visible ?
                <>
                  <View>
                    <Modal
                      visible={visible}
                      animationType="fade"
                      transparent={true}
                      onRequestClose={hidePopupModal}
                    >
                      <View style={Popstyles.modalContainer}>
                        <View style={Popstyles.modalContent}>
                          <Text style={Popstyles.messageText}> ההרשמה התבצעה בהצלחה !</Text>
                          <View style={{ alignItems: 'center' }}>
                            <Image source={require('../Images/mark.png')} style={{
                              height: 180,
                              width: 180,
                            }}></Image>
                          </View>
                          <TouchableOpacity onPress={ReturnTologinScreen}>
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
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>

  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: "100%",
    backgroundColor: Colors.white,
    paddingVertical: 80,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
  },
  h1_title: {
    textAlign: "center",
    fontSize: 40,
    marginBottom: 20,
  },
  rowInputConteiner: {
    marginBottom: 12,
    justifyContent: "center",
    width: "90%",
    flexDirection: 'row-reverse'
  },
  input: {
    backgroundColor: Colors.white,
    marginBottom: 12,
    textAlign: "right",
    width: "90%",
  },
  input2: {
    backgroundColor: Colors.white,
    marginBottom: 10,
    marginEnd: 2,
    marginStart: 2,
    width: "50%",

  },
  button: {
    backgroundColor: Colors.primary,
    width: "40%",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  button2: {
    backgroundColor: Colors.primary,
    width: "50%",
    padding: 15,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderRadius: 5,
    marginTop: 20,
  },
  smoke_comtiner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    width: "50%",
  }
});
