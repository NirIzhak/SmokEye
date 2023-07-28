import { View, Text, TouchableWithoutFeedback, StyleSheet, TextInput, Switch, TouchableOpacity, Keyboard } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { SmokeyeContext } from '../Context/SmokEyeContext';
import { Colors, fontSizes } from "../style/AllStyels";
import { APIContext } from '../Context/APIContext';
export default function EditDetails() {
  const [currentAddress, setCurrentAddress] = useState([]);
  const [once, setOnce] = useState(false);
  const { setlastName, setFirstName,
    setEmail, setPhone,
    firstName, lastName, email, phone,
    setAddress, toggleSwitch,
    smoke, Temail,
    setTemail,
    address,
    Tphone,
    setTPhone,
    TStreet,
    setTStreet,
    TStreetNum,
    setTStreetNum,
    TCity,
    setTCity,
    TfirstName,
    setTFirstName,
    TlastName,
    setTlastName } = useContext(SmokeyeContext);
  const { currentUser, UpdateUser } = useContext(APIContext);


  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const upDateUser = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (Temail != "" && emailPattern.test(Temail)) { setEmail(Temail); console.log('hi :>> '); }
    else { setEmail(currentUser.email); console.log('bye :>> '); }
    if (TfirstName != "") { setFirstName(TfirstName) }
    else { setFirstName(currentUser.firstName) }
    if (TlastName != "") { setlastName(TlastName) }
    else { setlastName(currentUser.lastName) }
    if (Tphone != "") { setPhone(Tphone); }
    else { setPhone(currentUser.phone); }
    if (TStreet != "" && TStreetNum != "" && TCity != "") {
      setAddress({ TStreet, TStreetNum, TCity })
    }
    else {
      setAddress({ address })
    }
    UpdateUser(currentUser.email, firstName, lastName, email, phone, address)
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
          onChangeText={(text) => setTFirstName(text)}
          defaultValue={currentUser.firstName}
        />
        <TextInput
          style={styles.input}
          placeholder="שם משפחה"
          onChangeText={(text) => setTlastName(text)}
          defaultValue={currentUser.lastName}
        />
        <TextInput
          style={styles.input}
          placeholder="שם משתמש (מייל)"
          onChangeText={(text) => setTemail(text)}
          keyboardType="email-address"
          defaultValue={currentUser.email}
        />
        <TextInput
          style={styles.input}
          placeholder="פלאפון"
          onChangeText={(text) => setTPhone(text)}
          keyboardType="phone-pad"
          defaultValue={currentUser.phone}
        />
        <TextInput
          style={styles.input}
          placeholder="רחוב"
          onChangeText={(text) => setTStreet(text)}
          defaultValue={"iiiiiii"}
        />
        <TextInput
          style={styles.input}
          placeholder="מספר רחוב"
          onChangeText={(text) => setTStreetNum(text)}
          defaultValue={"uuuuu"}
        />
        <TextInput
          style={styles.input}
          placeholder="עיר"
          onChangeText={(text) => setTCity(text)}
          defaultValue={"ccc"}
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