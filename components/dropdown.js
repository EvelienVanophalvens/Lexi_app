import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../Styles.js';

const Dropdown = (props) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [codeWord, setCodeWord] = useState([]);
  const options = props.options;

   
  useEffect(() => {
    fetch('https://evelienvanophalvens.be/Lexi/userCodeWords.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({

        user: props.user,
        setting : props.setting, 
    
    }),
    })
    .then(response => response.json())
    .then(data => {
    setCodeWord(data.result["codeWord"]);
    console.log("h"+ data.result["codeWord"]);
    })
    .catch(error => {
    console.error(error);
    });
}, []);




  const handleSelectOption = async (option) => {
    setSelectedOption(option);
    setDropdownVisible(false);

    
  console.log(props.user);
  console.log(props.setting);
  console.log(option.id);

    try {
      const response = await fetch('https://evelienvanophalvens.be/Lexi/updateCodeWords.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            
            codeWord : option.id,
            user: props.user,
            setting : props.setting, 
        
        }),
      });


      const data = await response.json();
      console.log(data.codeWords);
      setCodeWord(data.codeWords);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.marginTop}>
      <Text style={[styles.label, styles.bodyBig]}>{props.label}</Text>
      <View style={styles.input2}>
        <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
          <Text style={styles.bodySmall}>{selectedOption ? selectedOption.codeWord : codeWord}</Text>
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdownOptions}>
            <ScrollView style={{ maxHeight: 600 }}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelectOption(option)}
                >
                  <Text style={[styles.bodySmall, styles.padding]}>{option.codeWord}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

export default Dropdown;