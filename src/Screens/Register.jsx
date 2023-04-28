
import { Text, View,StyleSheet,TextInput,Switch, Keyboard,TouchableWithoutFeedback,TouchableOpacity } from 'react-native'
import { useContext, useState } from 'react';
import { SmokeyeContext } from '../Context/SmokEyeContext';

export default function Register() {

  const {setName,setEmail,setPhone,setAddress,AddClient} = useContext(SmokeyeContext);
  
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handlePress = () => {
    Keyboard.dismiss();
  };
  
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
    <View style={styles.container} >
      <Text style={{ textAlign: "center", marginTop: 10, fontSize: 40, marginBottom: 50}}>הרשמה</Text>
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
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20, width: '50%',marginLeft: 'auto', marginRight: 'auto' }}>
        <Text style={{fontSize:20}}>מעשן</Text>
       <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{margin: 10}}
      />
       <Text style={{fontSize:20}}>לא מעשן</Text>
      </View>
      <TouchableOpacity onPress={AddClient} style={styles.button}>
        <Text style={{textAlign:'center'}}>הרשם</Text>
      </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title:{
    textAlign: 'right'
  },
  formContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  input: {
    flexDirection:'row',
    width:'50%',
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    width: '60%', 
    marginLeft: 'auto', 
    marginRight: 'auto',
    textAlign: 'center'
  },
  button: {
    backgroundColor: "gray",
    width:'40%',
    padding:15,
    borderRadius: 20,
    color:'#fff'
  }
})