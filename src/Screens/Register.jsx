import { View,Button,StyleSheet,TextInput,Switch,Text } from 'react-native'
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
  
  const AddUser = () => {
    let user = {
      name,
      email,
      phone,
      address
    }
    console.log('user :>> ', user);
    setClients(user);
    
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>שם מלא</Text>
      <TextInput
        style={styles.input}
        placeholder="שם מלא"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.title}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <Text style={styles.title}>מספר טלפון</Text>
      <TextInput
        style={styles.input}
        placeholder="טלפון"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
      />
      <Text style={styles.title}>כתובת</Text>
      <TextInput
        style={styles.input}
        placeholder="כתובת"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <Text>מעשן ?</Text>
       <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Button title="הרשם" onPress={AddUser} />
      </View>
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
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
})