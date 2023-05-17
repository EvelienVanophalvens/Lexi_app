import React, { useState, useContext } from 'react';
import { ScrollView, Text, View, TextInput, TouchableWithoutFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../Styles.js';
import UserContext from '../components/userContext';



const LoginScreen = ({ navigation }) => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const { id, setId } = useContext(UserContext);

  
    const handleLogin = () => {

      if (phoneNumber.length === 0 || password.length === 0) {
        alert("Required Field is Missing");
      } else {
        const insertAPIURL = "https://evelienvanophalvens.be/Lexi/login.php";
        console.log("filed");
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
      
        const data = {
          phoneNumber: phoneNumber,
          password: password
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
            console.log(responseData);
            if (responseData.Message == "member has been logged in successfully") {
              const user = responseData.Data;
                  console.log("Logged in successfully!");
                  navigation.navigate('Home');
                  setId(responseData.Data.id); // save the id in UserContext;
            } else {
              console.log("Incorrect username or password");
              alert("Incorrect username or password 2");
            }


          } catch (error) {
            console.log(error);
            alert("Something went wrong!");
          }
        })
        .catch((error) => {
          console.log("Error", error);
          alert("Something went wrong!");
        });
      }
      }
    

return(

<View style={styles.viewStyle}>
<View style={styles.background}>
    <View style={styles.login} >
        <View style={styles.logoView}>
        <Image
            style={styles.logo}
            source={require('../assets/img/logo.png')}
        />
    </View>
        <Text style={[styles.bodyBig, styles.label]}>Phone number</Text>
        <TextInput
            name={"phoneNumber"}
            keyboardType="numeric"
            placeholder={"Phone number"}
            placeholderTextColor="black"
            style={styles.input}
            onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
            />
        <Text style={[styles.bodyBig, styles.label]}>Password</Text>
        <TextInput
            name={"password"}
            placeholder={"Password"}
            placeholderTextColor="black"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
            />
        
         <TouchableWithoutFeedback onPress={() => navigation.navigate('passwordForgot')}>
            <View style={styles.forgotPassword}>
                <Text style={styles.bodySmall}>Forgot password?</Text>
            </View>
        </TouchableWithoutFeedback> 
        <View style={[styles.button2, styles.font, styles.test]} >
            <TouchableWithoutFeedback onPress={handleLogin} style={styles.button2} ><Text style={[styles.button, styles.font]}>Login</Text></TouchableWithoutFeedback>
        </View>


    <View style={styles.registration} >
      <Text style={[styles.bodySmall]}>Don't have an account yet?
        <Text style={[styles.bodySmall, styles.txtPurple]} onPress={() => navigation.navigate('Registration')}> create an account</Text>
      </Text>
    </View>
    </View>
</View>
</View>
);
}



export default LoginScreen;