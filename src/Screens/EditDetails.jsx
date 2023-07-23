import { View, Text, TouchableWithoutFeedback, StyleSheet, TextInput, Switch, TouchableOpacity, Keyboard } from 'react-native'
import { useContext } from 'react'
import { SmokeyeContext, useState } from '../Context/SmokEyeContext';
import { Colors, fontSizes } from "../style/AllStyels";
export default function EditDetails() {
  const { setPassword, setlastName, setFirstName, setEmail, setPhone, setAddress, toggleSwitch, smoke, firstName, lastName, email, password } = useContext(SmokeyeContext);
  /*const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');*/
  const upDateUser = () => {
  }
  const handlePress = () => {
    Keyboard.dismiss();
  };


  return (
    <TouchableWithoutFeedback onPress={handlePress} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>עריכת פרופיל</Text>
        <TextInput
          style={styles.input}
          placeholder="שם פרטי"
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="שם משפחה"
          onChangeText={(text) => setlastName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="שם משתמש (מייל)"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="סיסמא"
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="פלאפון"
          onChangeText={(text) => setPhone(text)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="כתובת"
          onChangeText={(text) => setAddress(text)}
        />
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>לא מעשן</Text>
          <Switch
            trackColor={{ false: Colors.borderColor, true: Colors.primary }}
            thumbColor={smoke ? Colors.primary : Colors.borderColor}
            ios_backgroundColor="#3e3e3s"
            onValueChange={toggleSwitch}
            value={smoke}
            style={styles.switch}
          />
          <Text style={styles.switchLabel}>מעשן</Text>
        </View>
        <TouchableOpacity onPress={upDateUser} style={styles.button}>
          <Text style={styles.buttonText}>עדכון משתמש</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center'
  },
  title: {
    fontSize: fontSizes.L,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  switchLabel: {
    fontSize: fontSizes.M,
  },
  switch: {
    margin: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: fontSizes.S,
    fontWeight: 'bold',
  },
})