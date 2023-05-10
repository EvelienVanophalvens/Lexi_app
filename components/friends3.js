import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, TouchableWithoutFeedback } from 'react-native';
import {styles} from '../Styles';



const SearchResults = (props) => {


  return (
    <View style={styles.listItem}>
          <View style={styles.leftContainer}>
            <Image source={{ uri: "https://evelienvanophalvens.be/Lexi/uploads/" + props.image }} style={ styles.img}/>
            <Text style={styles.body}>{props.name}</Text>
          </View>
          <View style={styles.rightContainer}>
            <TouchableWithoutFeedback onPress={() => props.onAddFriend()}>
            <Image source={require('../assets/img/accept.png')} style={ styles.icon}/>
            </TouchableWithoutFeedback>
          </View>
    </View>
  );
}

export default SearchResults;