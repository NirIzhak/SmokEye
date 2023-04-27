import { View, Text,Button,StyleSheet,CheckBox,TextInput } from 'react-native'
import { useState } from 'react';
import React from 'react'

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [smoke, setSmoke] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={smoke}
          onValueChange={(value) => setSmoke(value)}
        />
        <Text>Smoke / Don't Smoke</Text>
      </View>
      <Button title="Register" onPress={handleRegister} />
      </View>
  );
};
const styles = StyleSheet.create({

})