import {Text,View,StyleSheet,TextInput,Switch,Keyboard,TouchableOpacity,KeyboardAvoidingView} from "react-native";
import { useContext } from "react";
import { SmokeyeContext } from "../Context/SmokEyeContext";
export default function Register() {

  const {setPassword,setConfirmPassword,setName,setEmail,setPhone,setAddress,AddClient,toggleSwitch,smoke,
  } = useContext(SmokeyeContext);

  const handlePress = () => {
    Keyboard.dismiss();
  };
  
  return (
      <KeyboardAvoidingView behavior={'padding'} onPress={handlePress} >
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 40,
            marginBottom: 50,
          }}
        >
          הרשמה
        </Text>
        <Text style={styles.title}>שם</Text>
        <TextInput
          style={styles.input}
          placeholder="שם"
          onChangeText={(text) => setName(text)}
          onBlur={() => Keyboard.dismiss()}
        />
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="מייל"
          onChangeText={(text) => setEmail(text)}
          onBlur={() => Keyboard.dismiss()}
          keyboardType="email-address"
        />
        <Text style={styles.title}>סיסמא</Text>
        <TextInput
          style={styles.input}
          placeholder="סיסמא"
          onChangeText={(text) => setPassword(text)}
          onBlur={() => Keyboard.dismiss()}
        />
        <Text style={styles.title}>אמת סיסמא</Text>
        <TextInput
          style={styles.input}
          placeholder="אמת סיסמא"
          onChangeText={(text) => setConfirmPassword(text)}
          onBlur={() => Keyboard.dismiss()}
        />
        <Text style={styles.title}>מספר טלפון</Text>
        <TextInput
          style={styles.input}
          placeholder="פלאפון"
          onChangeText={(text) => setPhone(text)}
          onBlur={() => Keyboard.dismiss()}
          keyboardType="phone-pad"
        />
        <Text style={styles.title}>כתובת</Text>
        <TextInput
          style={styles.input}
          placeholder="כתובת"
          onChangeText={(text) => setAddress(text)}
          onBlur={() => Keyboard.dismiss()}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 20,
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Text style={{ fontSize: 20 }}> מעשן</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#7CC69E" }}
            thumbColor={smoke ? "#5CEE9F" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={smoke}
            style={{ margin: 10 }}
          />
          <Text style={{ fontSize: 20 }}>לא מעשן</Text>
        </View>
        <TouchableOpacity onPress={AddClient} style={styles.button}>
          <Text style={{ textAlign: "center" }}>הרשם</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    direction: "rtl",
    backgroundColor: "#f5f5f5",
    marginHorizontal:20,
    marginVertical:80
  },
  title: {
    textAlign: "left",
  },
  input: {
    flexDirection: "row",
    borderColor: "#8C8A89",
    borderRadius:5,
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'right',
  },
  button: {
    backgroundColor: "gray",
    width: "40%",
    padding: 15,
    borderRadius: 20,
    color: "#fff",
  },
});
