import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, FlatList, TouchableWithoutFeedback, Pressable, Image, TouchableOpacity } from 'react-native';
import UserContext from '../components/userContext';
import Friends from '../components/friends';
import Switch from '../components/switch';
import {styles} from '../Styles.js';


const HomeScreen = ({ navigation }) => {
  const { id } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [unavailable, setUnavailable] = useState([]);
  const [isActive, setIsActive] = useState(false);


  useEffect(() => {
    fetch('https://evelienvanophalvens.be/Lexi/friends.php', {
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
        setFriends(data.DataA);
        setUnavailable(data.DataB);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const toggleSwitch = () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);

    console.log(newActiveState ? 1 : 0);
    console.log(id);
  
    // Make a POST request to update the availability in the database
    fetch('https://evelienvanophalvens.be/Lexi/updateAvailability.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        available: newActiveState ? 1 : 0 // Convert the boolean to an integer for the database
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  };



  return (
    <ScrollView style={styles.background}>
      <View style={styles.View}>
        <View>
          <View style={styles.titlePurple}>
            <Text style={[styles.titleWhite, styles.titleMargin2]}>Lexi</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Friends')}>
              <Image source={require('../assets/img/iconFriends.png')} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Image source={require('../assets/img/iconSettings.png')} style={styles.icon}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.switchView}>
          <Text style={styles.body}>I am Available</Text>

        <Switch
            size={70}
            onPress={toggleSwitch}
            isActive={isActive}
        />


        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('CallLexi')}>
          <View style={[styles.listItem, styles.friends]} >
          <View style={styles.leftContainer}>
            <Image source={require('../assets/img/profile.png')} style={ styles.img}/>
            <Text style={styles.body}>Lexi</Text>
          </View>
          <View style={styles.rightContainer}>
            <Image source={require('../assets/img/call.png')} style={ styles.icon}/>
          </View>
    </View>
    </TouchableWithoutFeedback>
        <Text style={[styles.subTitle]}>Available</Text>
        <FlatList
          style={styles.friends}
          numColumns={1}
          data={friends}
          renderItem={({ item }) => (
            <Friends
              id={item.id}
              name={item.firstname}
              image={item.profilePicture}
              onSelectedFriend={(id) => navigation.navigate('Call', {id: id, name: item.firstname , image: item.profilePicture })}
            />
          )}
        />
      <Text style={[styles.subTitle]}>Unavailable</Text>
      <FlatList
        style={styles.friends}
        numColumns={1}
        data={unavailable}
        renderItem={({ item }) => (
          <Friends
            id={item.id}
            name={item.firstname}
            image={item.profilePicture}
            onSelectedFriend={(id) => navigation.navigate('Call', {id: id, name: item.firstname , image: item.profilePicture })}
          />
        )}
      />
      </View>
    </ScrollView>
  );
}

export default HomeScreen;