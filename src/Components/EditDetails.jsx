import { View, Text } from 'react-native'
import React from 'react'
import { useContext } from 'react';
import { SmokeyeContext } from '../Context/SmokEyeContext';

export default function EditDetails() {
    const {setName,setEmail,setPhone,setAddress,toggleSwitch,smoke} = useContext(SmokeyeContext);

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
        <Text style={{fontSize:20}}>לא מעשן</Text>
       <Switch
        trackColor={{false: '#767577', true: '#7CC69E'}}
        thumbColor={smoke ? '#5CEE9F' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={smoke}
        style={{margin: 10}}
      />
        <Text style={{fontSize:20}}>מעשן</Text>
      </View>
      <TouchableOpacity onPress={upDateUser} style={styles.button}>
        <Text style={{textAlign:'center'}}>עדכון משתמש</Text>
      </TouchableOpacity>
    </View>
  </TouchableWithoutFeedback>
  )
}