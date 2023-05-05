import React, { useState, useEffect  } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import {styles} from '../Styles.js';

const Inputs = (props) => {
    const [editable, setEditable] = useState(false);
    const [inputValue, setInputValue] = useState();
    const [inputRef, setInputRef] = useState(null);

 
  
    const handlePress = () => {
      setEditable(!editable);
    };
    
    const handleInputChange = (text) => {
      setInputValue(text);
    };
  
    const handleCancelPress = () => {
      setEditable(false);
      setInputValue(props.value);
    };
  
    const handleUpdatePress = () => {
        // Handle update logic here using the new value
        setEditable(false);
        console.log(inputValue);
        // Example of how to pass the new value to a parent component
        props.onUpdate(props.label, inputValue);
      };
  
    const focusInput = () => {
      if (inputRef) {
        inputRef.focus();
      }
    };

    useEffect(() => {
        focusInput();
      }, [inputValue]);
  
    const inputField = editable ? (
      <View>
       <TextInput
            ref={(ref) => setInputRef(ref)}
            style={[styles.Input, styles.body]}
            onChangeText={(text) => handleInputChange(text)} // Pass the new value here
            value={inputValue}
            placeholder={props.value}
            placeholderTextColor={'black'}
            autoFocus={true}
            />
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => {
              handleUpdatePress();
          }}>
            <Image source={require('../assets/img/update.png')} style={styles.icon2} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelPress}>
            <Image source={require('../assets/img/cancel.png')} style={styles.icon2} />
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <TextInput
        style={[styles.Input, styles.body, styles.nonEditable]}
        value={props.value}
        editable={false}
      />
    );
  
    useEffect(() => {
      focusInput();
    }, []);
  
    return (
      <View style={styles.marginTop}>
        <View style={styles.content}>
          <Image source={props.image} style={styles.icon} />
          <View >
            <Text style={[styles.label, styles.bodyBig]}>{props.label}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {inputField}
              <TouchableOpacity onPress={handlePress}>
                <Image source={require('../assets/img/edit.png')} style={styles.pencilIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
};



export default Inputs;