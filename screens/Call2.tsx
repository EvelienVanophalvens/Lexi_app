import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import CallKeep from 'react-native-callkeep';

const CallScreen = () => {
  const [number, setNumber] = useState('');

  const startCall = () => {
    const callUUID = CallKeep.startCall(number, `${number};Lindsay Peeters;`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={number}
        onChangeText={setNumber}
      />
      <Button title="Call" onPress={startCall} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
});

CallKeep.setup({
  ios: {
    appName: 'My App',
  },
  android: {
    alertTitle: 'Permissions Required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'ok',
    selfManaged: true, // enable self managed mode
  },
});

export default CallScreen;