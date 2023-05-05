import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, PlaceholderImage, Button, Touchable, TouchableWithoutFeedback } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {styles} from '../Styles.js';

const ProfilePictureScreen = ({ navigation, route }) => {



    const [selectedImage, setSelectedImage] = useState(null);
    const { userId } = route.params;
    console.log( JSON.stringify(userId));



    const handleChoosePhoto = async () => {
        launchImageLibrary(
          {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
          },
          response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              setSelectedImage(response.assets[0]);
              console.log(response.assets[0]);
            }
          }
        );
      };


    const handleUploadPhoto = async () => {
        console.log("uploading photo");
        const data = new FormData();
        data.append('image', {
            name: selectedImage.fileName,
            type: selectedImage.type,
            uri: selectedImage.uri
        });
        data.append('userId', userId);
        console.log(data);
        console.log(data._parts[0][1]);
        fetch('https://evelienvanophalvens.be/Lexi/profilePicture.php', {
            method: 'POST',
            body: data
        })
        .then(response => response.text())
        .then(text => {
            console.log(text);
            try {
                const responseData = JSON.parse(text);
                console.log (responseData.Message);
                navigation.navigate('Login');
            } catch (error) {
                alert("Error parsing response: " + error.message);
            }
        })
        .catch(error => {
            console.log("Error: " + error.message);
        })
    }


return(
<View style={styles.viewStyle}>
<Text style={styles.title}>Choose profile picture</Text> 

{selectedImage && <Image source={{ uri: selectedImage.uri }} style={ styles.profileImg} />  }



{!selectedImage && (
  <View style={styles.button2}>
    <TouchableWithoutFeedback onPress={handleChoosePhoto}>
      <Text style={styles.buttonLong}>Pick your profile image</Text>
    </TouchableWithoutFeedback>
  </View>
)}

{selectedImage && (
  <View style={styles.button2}>
    <TouchableWithoutFeedback onPress={handleUploadPhoto}>
      <Text style={styles.buttonLong}>Upload your profile image</Text>
    </TouchableWithoutFeedback>
  </View>
)}

        


</View>
);
}



export default ProfilePictureScreen;