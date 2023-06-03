import {Text,View,StyleSheet,TextInput,Switch,Keyboard,TouchableOpacity,KeyboardAvoidingView, SafeAreaView} from "react-native";
import { useContext } from "react";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import { Colors } from "../style/AllStyels";
export default function Register() {

  const {setPassword,setConfirmPassword,setName,setEmail,setPhone,setAddress,AddClient,toggleSwitch,smoke,
  } = useContext(SmokeyeContext);

  const handlePress = () => {
    Keyboard.dismiss();
  };
  
  return (
      <KeyboardAvoidingView behavior={'padding'} onPress={handlePress} >
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 40,
            marginBottom: 30,
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
          style={styles.smoke_comtiner}
        >
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
      </SafeAreaView>
      </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal:20,
    marginVertical:20
  },
  title: {
    textAlign: "center",
    fontSize: 18
  },
  input: {
    flexDirection: "row",
    borderColor: "#8C8A89",
    borderRadius:5,
    borderWidth: 1,
    marginBottom: 12,
    textAlign: 'right',
    height: 35,
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  button: {
    backgroundColor:Colors.primary,
    width: "40%",
    padding: 15,
    borderRadius: 20,
    color: "#fff",
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  smoke_comtiner:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto"
  }
});
