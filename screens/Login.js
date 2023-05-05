import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Image } from 'react-native';



const LoginScreen = ({ navigation }) => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

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
                const user = responseData.Data

            }
            

        }
            catch (error) {
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

    
    <View style={styles.login} >
        <View style={styles.logoView}>
        <Image
            style={styles.logo}
            source={require('../assets/img/logo.png')}
        />
    </View>
        <Text style={[styles.label, styles.font]}>Phone number</Text>
        <TextInput
            name={"phoneNumber"}
            keyboardType="numeric"
            placeholder={"Phone number"}
            style={[styles.txtStyle, styles.txtStyle2, styles.font]}
            onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
            />
        <Text style={[styles.label, styles.font]}>Password</Text>
        <TextInput
            name={"password"}
            placeholder={"Password"}
            style={[styles.txtStyle, styles.font]}
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
            />
        
         <TouchableWithoutFeedback onPress={() => navigation.navigate('passwordForgot')}>
            <View style={styles.forgotPassword}>
                <Text style={ styles.font}>Forgot password?</Text>
            </View>
        </TouchableWithoutFeedback> 
        <View style={[styles.button2, styles.font, styles.test]} >
            <TouchableWithoutFeedback onPress={handleLogin} style={styles.button2} ><Text style={[styles.button, styles.font]}>Login</Text></TouchableWithoutFeedback>
        </View>


    <View style={styles.registration} >
      <Text style={[styles.registrationText, styles.font]}>Don't have an account yet?
        <Text style={[styles.registrationText2, styles.font]} onPress={() => navigation.navigate('registration')}> create an account</Text>
      </Text>
    </View>
    </View>
</View>
);
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'nunito',
    },

  viewStyle: {
    flex: 1,
    padding: 60,
    marginTop: 20,


  },
  txtStyle: {
    borderWidth: 1,
    borderColor: "#D0D5D9",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },

  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'black',
    },

  txtStyle2: {
    marginBottom: 30,
    },
  button: {
    alignItems: "center",
    backgroundColor: "#7D4CFF",
    padding: 22.5,
    width: 190,
    color: 'white',
    textAlign: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
    },

    button2: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    login: {
        flex: 1,
    },

    registration: {
        marginLeft:-40,
        marginRight:-40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150,
    },

    registrationText: {
        fontSize: 18,
    },

    registrationText2:{
        color: '#7D4CFF',
        fontSize: 18,
    },

    logoView:{
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    logoView:{

        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },

    forgotPassword:{
        marginTop: 10,
        marginBottom: 60,
        borderBottomColor: '#00000',
        borderBottomWidth: 1,
        alignSelf: 'flex-start',
    },

    
    
});

export default LoginScreen;