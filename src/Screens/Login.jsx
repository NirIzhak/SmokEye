import {useContext } from "react";
import {Image,View,Text,TextInput,TouchableOpacity,TouchableWithoutFeedback,Keyboard,StyleSheet} from "react-native";
import { SmokeyeContext } from "../Context/SmokEyeContext";


export default function Login({navigation}) {

  const {setEmail,setPassword,password,email} = useContext(SmokeyeContext);
  const handlePress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={Styles.continer}> 
        <Text style={{ textAlign: "center", marginTop: 110, fontSize: 40 }}>
          התחברות
        </Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholder="מייל"
          style={Styles.input}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholder="סיסמא"
          secureTextEntry={true}
          style={Styles.input}
          onBlur={() => Keyboard.dismiss()}
        />
        <TouchableOpacity>
          <Text
            onPress={() => {
                console.log(password, email);
                navigation.navigate("userScreens")
                
            }}
            style={{ textAlign: "center", marginTop: 50 }}
          >
            התחברות
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
            navigation.navigate('Register')
        }} style={{marginTop: 100}}>
          <Text style={Styles.button}>
            אין לך משתמש ? הרשם עכשיו !
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} ></Image>
          <Text style={Styles.button}>
            התחברות מהירה עם גוגל
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          navigation.navigate("FastReport")
        }}>
          <Text style={Styles.button}>
            כניסה מהירה ללא התחברות
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
const Styles = StyleSheet.create({
  continer:{
    flex:1,
    direction: "rtl"
  },
  input:{
    borderWidth:1,
    borderRadius:25,
    borderStyle:'solid',
    borderColor:'#8C8A89',
    justifyContent:'center',
    textAlign: "center",
    fontSize: 24,
    padding:5,
    marginTop:20,
    marginLeft:50,
    marginRight:50
  },
  button:{
    backgroundColor:'#EFC862',
    borderWidth:1,
    borderRadius:25,
    borderStyle:'solid',
    borderColor:'transparent',
    justifyContent:'center',
    textAlign: "center",
    fontSize: 15,
    padding:5,
    marginTop:20,
    marginLeft:50,
    marginRight:50
  }

})
