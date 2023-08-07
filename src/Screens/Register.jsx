import { Text, View, StyleSheet, Switch, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Image, Modal, Alert } from "react-native";
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

  const handlePress = () => {
    Keyboard.dismiss();
  };
  return (
    <>
      <SafeAreaView>

      </SafeAreaView>
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
      </View>
    </>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",
    backgroundColor: Colors.white
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
    margin: 15,
    width: "45%",

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
    width: "30%",
    padding: 15,
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
