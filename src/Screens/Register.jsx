import {Text,View,StyleSheet,TextInput,Switch,Keyboard,TouchableOpacity,KeyboardAvoidingView, SafeAreaView,Image,Animated,Modal} from "react-native";
import { useContext,useState,useRef,useEffect } from "react";
import { SmokeyeContext } from "../Context/SmokEyeContext";
import { Colors } from "../style/AllStyels";


export default function Register() {
  const [visible, setVisible] = useState(false);
  const {setPassword,setConfirmPassword,setName,setEmail,setPhone,setAddress,AddClient,toggleSwitch,smoke,
  } = useContext(SmokeyeContext);

  const handlePress = () => {
    Keyboard.dismiss();
  };
  const ModalPoup = ({visible, children}) => {
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackGround}>
          <Animated.View
            style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
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
        <TouchableOpacity onPress={()=>setVisible(true)} style={styles.button}>
          <Text style={styles.title}>הרשם</Text>
        </TouchableOpacity>
        <ModalPoup visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => {AddClient();
              setVisible(false)
              }}>
              <Image
                source={{uri:"https://cdn-icons-png.flaticon.com/512/67/67345.png?w=740&t=st=1685792830~exp=1685793430~hmac=8c346bf78fce79a22309a9833f9ca23399d7d2a51a3a91f450129e146e0acb5f"}}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{uri:"https://cdn-icons-png.flaticon.com/512/1102/1102052.png?w=740&t=st=1685792426~exp=1685793026~hmac=dc4ad9d28be355423331316bbc9134a769239442102bee59e4438c3d243d7b3c"}}
            style={{height: 150, width: 150, marginVertical: 10}}
          />
        </View>

        <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
          הרשמתך נקלטה בהצלחה !
        </Text>
      </ModalPoup>
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
  },
  /************* */
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
