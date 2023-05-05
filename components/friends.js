import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, TouchableWithoutFeedback } from 'react-native';
import {styles} from '../Styles.js';



const Friends = (props) => {


  return (
    <TouchableWithoutFeedback onPress={() => props.onSelectedFriend(props.id)}>
    <View style={styles.listItem}>

          <View style={styles.leftContainer}>
            <Image source={{ uri: "https://evelienvanophalvens.be/Lexi/uploads/" + props.image }} style={ styles.img}/>
            <Text style={styles.body}>{props.name}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Image source={require('../assets/img/call.png')} style={ styles.icon}/>
          </View>
    </View>
    </TouchableWithoutFeedback>
  );
}



export default Friends;