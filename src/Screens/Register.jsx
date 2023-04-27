import { Text, View,Button,StyleSheet,TextInput,Switch, Keyboard,TouchableWithoutFeedback } from 'react-native'
import { useState } from 'react';
import React from 'react'

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [clients,setClients] = useState([]);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handlePress = () => {
    Keyboard.dismiss();
  };
  
  const AddUser = () => {
    let user = {
      name,
      email,
      phone,
      address
    }
    setClients(user);
    
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
    <View style={styles.container} >
      <Text style={{ textAlign: "center", marginTop: 110, fontSize: 40, marginBottom: 70}}>הרשמה</Text>
      <TextInput
        style={styles.input}
        placeholder="שם"
        value={name}
        onChangeText={(text) => setName(text)}
        onBlur={() => Keyboard.dismiss()}

      />
      <TextInput
        style={styles.input}
        placeholder="מייל"
        value={email}
        onChangeText={(text) => setEmail(text)}
        onBlur={() => Keyboard.dismiss()}

        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="פלאפון"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        onBlur={() => Keyboard.dismiss()}

        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="כתובת"
        value={address}
        onChangeText={(text) => setAddress(text)}
        onBlur={() => Keyboard.dismiss()}

      />
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 100, width: '50%',marginLeft: 'auto', marginRight: 'auto' }}>
        <Text style={{fontSize:20}}>לא מעשן</Text>
       <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{margin: 10}}
      />
       <Text style={{fontSize:20}}>מעשן</Text>
      </View>
      <Button title="הרשם" onPress={AddUser}  />
      </View>
      </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#f5f5f5',
  // },
  formContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  input: {
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
})