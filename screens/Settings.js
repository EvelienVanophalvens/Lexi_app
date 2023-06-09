import react, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import UserContext from '../components/userContext';
import {styles} from '../Styles.js';



import Inputs from '../components/inputSettings';
import Dropdown from '../components/dropdown';



const SettingsScreen = ({ navigation }) => {
    const { id } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState([]);
    const [codeWords, setCodeWords] = useState([]);

    useEffect(() => {
        fetch('https://evelienvanophalvens.be/Lexi/userInfo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
        }),
        })
        .then(response => response.json())
        .then(data => {
        setUserInfo(data.userInfo[0]);
        })
        .catch(error => {
        console.error(error);
        });
    }, []);

    
    
    useEffect(() => {
        fetch('https://evelienvanophalvens.be/Lexi/codeWords.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        })
        .then(response => response.json())
        .then(data => {
        setCodeWords(data.Data);
        console.log(data.Data);
        })
        .catch(error => {
        console.error(error);
        });
    }, []);



    const updateUserInfo = (key, value) => {
        const updatedUserInfo = { ...userInfo, [key]: value };
        setUserInfo(updatedUserInfo);
        console.log(updatedUserInfo);
      
        fetch('https://evelienvanophalvens.be/Lexi/updateUserInfo.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            key: key,
            value: value,
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data.userInfo[0]);
          setUserInfo(data.userInfo[0]);
        })
        .catch(error => {
          console.error(error);
        });
      }

      const deleteAccount = () => {
        console.log(id);
        fetch('https://evelienvanophalvens.be/Lexi/deleteAccount.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
            }),
        })

        navigation.navigate('Login');
    }







    return (
        <ScrollView style={[styles.scrollView, styles.background]}>
            <View style={styles.View}>
                <View  style={styles.titlePurple}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={styles.icon3} source={require('../assets/img/backArrow.png')} />
                </TouchableOpacity>
                    <Text style={[styles.titleWhite, styles.titleMargin1]}>Settings</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('friendRequest')}>
                <View style={styles.leftContainer}>
                    <Text style={[styles.friendRequestText, styles.body]}>friends requests</Text>
                    <Image source={require('../assets/img/friendRequest.png')} style={styles.icon} />
                </View>
                </TouchableWithoutFeedback>
                    <Text style={[styles.subTitle]}>profile</Text>
                    <Inputs
                        image={require('../assets/img/accountCircle.png')}
                        label="Firstname"
                        placeholder="firstname"
                        value={userInfo.firstname}
                        onUpdate = {(key, value) => updateUserInfo(key, value)}
                    />
                     <Inputs
                        image = {require('../assets/img/accountCircle.png')}
                        label = "Lastname"
                        placeholder = "Lastname"
                        value = {userInfo.lastname}
                        onUpdate = {(key, value) => updateUserInfo(key, value)}
                    />
                    <Inputs
                        image = {require('../assets/img/key.png')}
                        label = "password"
                        placeholder = "password"
                        value = {userInfo.password}
                        onUpdate = {(key, value) => updateUserInfo(key, value)}
                    />
                    <Inputs
                        image = {require('../assets/img/call.png')}
                        label = "phone number"
                        placeholder = "phone number"
                        value = {userInfo.phoneNumber}
                        onUpdate = {(key, value) => updateUserInfo(key, value)}
                    />

                    <Text style={[styles.subTitle]}>Secret words</Text>
                    <Dropdown
                        label = "Flashlight"
                        options = {codeWords}
                        user = {id}
                        setting = {0}
                    />
                    <Dropdown
                        label = "Sound Alarm"
                        options = {codeWords}
                        user = {id}
                        setting = {1}


                    />
                    <Dropdown
                        label = "Emergency"
                        options = {codeWords}
                        user = {id}
                        setting = {2}

                    />
            </View>
            <View style={[styles.button2, styles.font]} >
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')} ><Text style={[styles.button, styles.font, styles.marginBottom]}>Logout</Text></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={deleteAccount} ><Text style={[styles.font, styles.txtRed, styles.marginBottom, styles.marginTop]}>Delete Account</Text></TouchableWithoutFeedback>
        </View>

        </ScrollView>
    )
}

export default SettingsScreen;


