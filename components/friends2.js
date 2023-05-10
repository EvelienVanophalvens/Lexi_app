import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, TouchableWithoutFeedback } from 'react-native';
import {styles} from '../Styles.js';



const Friends = (props) => {


  return (
    <View style={styles.listItem}>

          <View style={styles.leftContainer}>
            <Image source={{ uri: "https://evelienvanophalvens.be/Lexi/uploads/" + props.image }} style={ styles.img}/>
            <Text style={styles.body}>{props.name}</Text>
          </View>
          <View style={styles.rightContainer}>
            <TouchableWithoutFeedback onPress={() => props.onDeleteFriend()}>
                <Image source={require('../assets/img/reject.png')} style={ styles.icon}/>
            </TouchableWithoutFeedback>    
          </View>
    </View>
  );
}



export default Friends;