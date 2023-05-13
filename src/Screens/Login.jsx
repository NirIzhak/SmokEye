import {useContext } from "react";
import {Image,View,Text,TextInput,TouchableOpacity,TouchableWithoutFeedback,Keyboard,StyleSheet} from "react-native";
import { SmokeyeContext } from "../Context/SmokEyeContext";


export default function Login({navigation}) {

  const {setEmail,setPassword,ConfirmClient, email, password, setCurrentUser} = useContext(SmokeyeContext);
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
          style={[Styles.input,Styles.input_btn]}
          keyboardType="email-address"
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholder="סיסמא"
          secureTextEntry={true}
          style={[Styles.input,Styles.input_btn]}
          onBlur={() => Keyboard.dismiss()}
        />
        <TouchableOpacity>
          <Text
            onPress={() => {const typerole = ConfirmClient(email, password);
              if(typerole == undefined){
                  alert("No User")
              }
              else{
                  setCurrentUser(typerole);
                if(typerole.role == "User"){
                    navigation.navigate("userScreens")
                    alert("user")
                }
                else if(typerole.role == "Admin"){
                    navigation.navigate("adminScreens")
                    alert("admin")
          
                }
                else if(typerole.role == "Regulator"){
                    alert("regulator")
                }
                else if(typerole.role == "Reasercher"){
                    alert("reasercher")
                }
              }}}
            style={{ textAlign: "center", marginTop: 50 }}>
            התחברות
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
            navigation.navigate('Register')
        }} style={{marginTop: 100}}>
          <Text style={[Styles.button,Styles.input_btn]}>
            אין לך משתמש ? הרשם עכשיו !
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} ></Image>
          <Text style={[Styles.button,Styles.input_btn]}>
            התחברות מהירה עם גוגל
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          navigation.navigate("FastReport")
        }}>
          <Text style={[Styles.button,Styles.input_btn]}>
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
  input_btn:{
    justifyContent:'center',
    textAlign: "center",
    borderWidth:1,
    borderStyle:'solid',
    borderRadius:25,
    padding:5,
    marginTop:20,
    marginLeft:50,
    marginRight:50
  },
  input:{
    borderColor:'#8C8A89',
    fontSize: 24,
  
  },
  button:{
    fontSize: 15,
    backgroundColor:'#EFC862',
    borderColor:'transparent',
  }

})
