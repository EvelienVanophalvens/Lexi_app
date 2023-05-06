import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';

import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { map, filter } from "rxjs/operators";

import Torch from 'react-native-torch';
import Tts from 'react-native-tts';





function CallScreen() {

  const [isTorchOn, setIsTorchOn] = useState(false);

  Torch.switchState(isTorchOn);

  const [orientation, setOrientation] = useState('');
  const [recognized, setRecognized] = useState('');
  const [volume, setVolume] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  setUpdateIntervalForType(SensorTypes.accelerometer, 1000); // defaults to 100ms

  function getPhoneOrientation({ x, y, z }) {
    const threshold = 2; // adjust this value as needed
    if (Math.abs(x) > Math.abs(y)) {
      setOrientation('landscape');
      return "landscape";
    }
     else {
      setOrientation('portrait');
      return "portrait";
    }
  }

  const subscription = accelerometer
    .pipe(
      map(({ x, y, z }) => ({
        x: x.toFixed(2),
        y: y.toFixed(2),
        z: z.toFixed(2),
        total: (x + y + z).toFixed(2),
        orientation: getPhoneOrientation({ x, y, z }),
      })),
    )
    .subscribe((accelerometer) => {
      console.log(accelerometer);
    });

  useEffect(() => {
    console.log("orientation", orientation);

    
    if (orientation === "landscape") {
      Tts.getInitStatus().then(() => {
        Tts.setDefaultLanguage('en-US');
        Tts.setDefaultRate(0.5);
        Tts.setDefaultPitch(1.0);
        Tts.speak('Say one of your words!')
          .then(() => {
            Voice.start('en-US');
            console.log("Voice started");
          })
          .catch((error) => {
            console.log(error);
          });
      }, (err) => {
        if (err.code === 'no_engine') {
          Tts.requestInstallEngine();
        }
      });
    } else {
      Voice.stop();
    }

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [orientation]);

  const onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log('onSpeechRecognized: ', e);
    setRecognized('√');
  };

  const onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
    setEnd('√');
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
    if (e.value && e.value.length > 0) {
      const firstWord = e.value[0].split(' ')[0]; // split and take the first word
      setResults([firstWord]);
    }
  };


  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = (e: any) => {
    console.log('onSpeechVolumeChanged: ', e);
    setVolume(e.value);
  };


  const _clearState = () => {
    setRecognized('');
    setVolume('');
    setError('');
    setEnd('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
  };

  if (results[0] === "hello") {
    Torch.switchState(true);
  } 

  if (results[0] === "cancel") {
    Torch.switchState(false);
  }




  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});

export default CallScreen;