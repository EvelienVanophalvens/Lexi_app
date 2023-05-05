import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { styles } from '../Styles.js';

const Dropdown = (props) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8', 'Option 9', 'Option 10'];
  return (
    <View style={styles.marginTop}>
        <Text style={[styles.label, styles.bodyBig]}>{props.label}</Text>
        <View style={styles.input2}>
            <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
                <Text style={styles.bodySmall}>{selectedOption || 'Select an option'}</Text>
            </TouchableOpacity>
            {dropdownVisible && (
                <View style={styles.dropdownOptions}>
                    <ScrollView style={{ maxHeight: 600 }}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setSelectedOption(option);
                                    setDropdownVisible(false);
                                }}
                            >
                                <Text style={[styles.bodySmall, styles.padding ]}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    </View>
  );
}



export default Dropdown;