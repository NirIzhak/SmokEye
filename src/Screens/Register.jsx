import { Text, View, StyleSheet, TextInput, Switch, TouchableOpacity, SafeAreaView, Image, Animated, Modal, Button, Alert } from "react-native";
import { useContext, useState, useRef, useEffect } from "react";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import { Colors } from "../style/AllStyels";
import { APIContext } from "../Context/APIContext";
import * as ImagePicker from "expo-image-picker";
import { Popstyles } from "../style/PopUpModal";
export default function Register({ navigation }) {

  const [tempUser, setTempuser] = useState();
  const [photo, setPhoto] = useState(null);
  const { email, password, phone, address, setPassword, setFirstName, setlastName, setEmail, setPhone, setAddress, toggleSwitch, smoke, firstName, lastName } = useContext(SmokeyeContext);
  const { visible, setVisible, InsertNewUser, ImageUploader } = useContext(APIContext);

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
    const imageLink = await ImageUploader(photo);
    setTempuser({
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      email: `${email}`,
      password: `${password}`,
      phone: `${phone}`,
      address: `${address}`,
      role: "client",
      smoke: smoke,
      img: imageLink,
      isActive: true,
    });
    console.log(imageLink);
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


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1_title}>הרשמה</Text>
      <Text style={styles.title}>שם פרטי</Text>
      <TextInput
        style={styles.input}
        placeholder="שם פרטי"
        onChangeText={(text) => setFirstName(text)}
      />
      <Text style={styles.title}>שם משפחה</Text>
      <TextInput
        style={styles.input}
        placeholder="שם משפחה"
        onChangeText={(text) => setlastName(text)}
      />
      <Text style={styles.title}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="מייל"
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <Text style={styles.title}>סיסמא</Text>
      <TextInput
        style={styles.input}
        placeholder="סיסמא"
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.title}>מספר טלפון</Text>
      <TextInput
        style={styles.input}
        placeholder="פלאפון"
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
      />
      <Text style={styles.title}>כתובת</Text>
      <TextInput
        style={styles.input}
        placeholder="כתובת"
        onChangeText={(text) => setAddress(text)}
      />
      <TouchableOpacity onPress={createTwoButtonAlert}>
        {photo ? (
          <Text style={[styles.btn]}>התמונה עלתה!</Text>
        ) : (
          <Text style={[styles.btn]}>העלאת תמונה</Text>
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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
  },
  h1_title: {
    textAlign: "center",
    fontSize: 40,
    marginBottom: 30,
  },
  input: {
    flexDirection: "row",
    borderColor: "#8C8A89",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 12,
    textAlign: "right",
    height: 35,
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    backgroundColor: Colors.primary,
    width: "40%",
    padding: 15,
    borderRadius: 20,
    color: "#fff",
    marginLeft: "auto",
    marginRight: "auto",
  },
  smoke_comtiner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
  }
});
