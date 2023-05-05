import react, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import UserContext from '../components/userContext';
import {styles} from '../Styles.js';



import Inputs from '../components/inputSettings';
import Dropdown from '../components/dropdown';



const SettingsScreen = ({ navigation }) => {
    const { id } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState([]);

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




    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.View}>
                <View  style={styles.titlePurple}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <Image style={styles.icon} source={require('../assets/img/backArrow.png')} />
                </TouchableWithoutFeedback>
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
                    />
                    <Dropdown
                        label = "Sound Alarm"
                    />
                    <Dropdown
                        label = "Emergency"
                    />
            </View>
            <View style={[styles.button2, styles.font]} >
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')} ><Text style={[styles.button, styles.font, styles.marginBottom]}>Logout</Text></TouchableWithoutFeedback>
        </View>

        </ScrollView>
    )
}

export default SettingsScreen;


