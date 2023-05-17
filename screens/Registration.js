import React, { useState } from 'react';
import { Text, View, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import * as bcrypt from 'bcryptjs';
import {styles} from '../Styles.js';





const RegistrationScreen =({ navigation }) => {

const [firstname, setFirstname] = useState('');
const [lastname, setLastname] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [password, setPassword] = useState('');
const [profilePicture, setProfilePicture] = useState('');


const handleRegister = () => {



if (firstname.length === 0 || lastname.length === 0 || phoneNumber.length ===0 || password.length === 0) {
  alert("Required Field is Missing");
} else {
  const insertAPIURL = "https://evelienvanophalvens.be/Lexi/registration.php";
  console.log("filed");
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  const data = {
    firstname: firstname,
    lastname: lastname,
    phoneNumber: phoneNumber,
    password: password,
  };
  console.log("data", data);
  fetch(insertAPIURL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
  .then(response => response.text())
  .then(text => {
    console.log(text);
    try {
      const responseData = JSON.parse(text);
      console.log (responseData.Message);
      const userId = responseData.Id;
      console.log(userId);
      navigation.navigate('ProfilePicture', {userId: userId});
    } catch (error) {
      alert("Error parsing response: " + error.message);
    }
  })
  .catch(error => {
    console.log("Error: " + error.message);
  })
}
}

return(
  
<View style={[styles.View, styles.background]}>

  <KeyboardAvoidingView behavior="position" enabled keyboardVerticalOffset={20}>
  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
    <Image style={[styles.icon3, styles.marginBottom]} source={require('../assets/img/backArrow_black.png')} />
  </TouchableOpacity>
  <Text style={styles.title}>Create a new account</Text>
  <Text style={[styles.label, styles.bodyBig]}>phonenumber</Text>
  <TextInput
    name={"phonenumber"}
    keyboardType="numeric"
    placeholder={"phonenumber"}
    placeholderTextColor={"black"}
    style={[styles.input]}
    onChangeText={phonenumber => setPhoneNumber(phonenumber)}
    />
  <Text style={[styles.label, styles.bodyBig]}>Firstname</Text>
  <TextInput
    name={"firstname"}
    placeholder={"Firstname"}
    placeholderTextColor={"black"}
    style={[styles.input]}
    onChangeText={firstname => setFirstname(firstname)}
    />
  <Text style={[styles.label, styles.bodyBig]}>Lastname</Text>
  <TextInput
    name={"lastname"}
    placeholder={"Lastname"}
    placeholderTextColor={"black"}
    style={[styles.input]}
    onChangeText={lastname => setLastname(lastname)}
    />
    <Text style={[styles.label, styles.bodyBig]}>password</Text>
  <TextInput
    name={"password"}
    placeholder={"Pasword"}
    secureTextEntry={true}
    placeholderTextColor={"black"}
    style={[styles.input]}
    onChangeText={password => setPassword(password)}
  />


    <View style={[styles.button2, styles.font]} >
        <TouchableWithoutFeedback onPress={handleRegister} style={styles.button2} ><Text style={[styles.button, styles.font]}>Create Account</Text></TouchableWithoutFeedback>
    </View>
  </KeyboardAvoidingView>
</View>
);
}



export default RegistrationScreen;