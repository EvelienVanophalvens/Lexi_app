import React, { useContext, useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  AppState, 
} from 'react-native';

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
  
} from '@react-native-voice/voice';

import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { map, filter, delay, timeInterval } from "rxjs/operators";
import Sound from 'react-native-sound';
import Torch from 'react-native-torch';
import Tts from 'react-native-tts';

import UserContext from '../components/userContext';
import {styles} from '../Styles';


var alarm = new Sound('alarm.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }

});

alarm.getNumberOfLoops




function CallLexi({navigation }) {

  const { id } = useContext(UserContext);


  let intervalId: NodeJS.Timeout;
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

  const [codeWord, setCodeWord] = useState([]);

  let said = false;


  useEffect(() => {
    fetch('https://evelienvanophalvens.be/Lexi/allUserCodeWords.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({

        user: id
    
    }),
    })
    .then(response => response.json())
    .then(data => {
    setCodeWord(data.result);
    console.log(data.result);
    })
    .catch(error => {
    console.error(error);
    });
}, []);


  


  useEffect(() => {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage('en-US');
      Tts.setDefaultRate(0.5);
      Tts.setDefaultPitch(1.0);
    });

    const sentences = [
      'Hello, I am Lexi',
      'how was your day?',
      'My day was great',
      'This evening I will be making a delicious dinner',
      'What are you going to do this evening?',
      'Do you have things planned for the weekend?',
      'I am going to the beach this weekend',
    ];

    let i = 0;

    intervalId = setInterval(() => {
      if (i < sentences.length) {
        Tts.speak(sentences[i], {
          androidParams: {
            KEY_PARAM_STREAM: 'STREAM_VOICE_CALL',
            },
          }
            );
        i++;
      }
    }, 5000);

  }, []);

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 1000); // defaults to 100ms

    function getPhoneOrientation({ x, y, z }) {
      const threshold = 1; // adjust this value as needed
      if (Math.abs(x) > Math.abs(y)) {
        setOrientation('landscape');
        return "landscape";
      } else {
        setOrientation('portrait');
        return "portrait";
      }
    }

    const subscription = accelerometer
      .pipe(
        map(({ x, y, z }) => ({
          x: x.toFixed(1),
          y: y.toFixed(1),
          z: z.toFixed(1),
          total: (x + y + z).toFixed(1),
          orientation: getPhoneOrientation({ x, y, z }),
        })),
      )
      .subscribe((accelerometer) => {
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {



    
    if (orientation === "landscape") {

      clearInterval(intervalId);

      alarm.stop();

      Tts.getInitStatus().then(() => {
        Tts.setDefaultLanguage('en-US');
        Tts.setDefaultRate(0.5);
        Tts.setDefaultPitch(1.0);
        Tts.speak('Say one of your words!',{
        androidParams: {
          KEY_PARAM_STREAM: 'STREAM_VOICE_CALL',
          },
        }
          )
          .catch((error) => {
            console.log(error);
          });
      }, (err) => {
        if (err.code === 'no_engine') {
          Tts.requestInstallEngine();
        }
      });
        _clearState();
        Voice.start('en-US');
        console.log("Voice started");
    }
    
    else {
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
    setStarted('√');
  };

  const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    setRecognized('√');
  };

  const onSpeechEnd = (e: any) => {
    setEnd('√');
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
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

  if (codeWord && codeWord.length > 0) {
    if (results && results.length > 0) {
      const spokenWord = results[0];
      const matchingCodeWord = codeWord.find((code) => code.codeWord.toLowerCase() === spokenWord.toLowerCase());

      console.log(spokenWord + ":spokenWord");

      if(spokenWord == "cancel"){
        Voice.stop();
        _clearState();
        if(!said){
        console.log("you have said cancel");
        Tts.speak('The call has been cancelled.', {
          androidParams: {
            KEY_PARAM_STREAM: 'STREAM_VOICE_CALL',
          },
        }
          )
        .catch((error) => {
          console.log(error);
        }
        )
        said = true;
      }
      }
  
      if (matchingCodeWord) {
        const codeWordId = matchingCodeWord.codeWordId;
        const setting = matchingCodeWord.setting;

        if(setting == 0){
          Torch.switchState(true);
        } else if(setting == 1){
            // loaded successfully
          console.log('duration in seconds: ' + alarm.getDuration() + 'number of channels: ' + alarm.getNumberOfChannels());
      
          alarm.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
      });
  
      alarm.setNumberOfLoops(-1);
  
        }else if(setting == 2){
          clearInterval(intervalId);
          Voice.stop();
          
          let isCodeExecuted = false;

          if (!isCodeExecuted) {
            Tts.getInitStatus()
              .then(() => {
                Tts.setDefaultLanguage('en-US');
                Tts.setDefaultRate(0.5);
                Tts.setDefaultPitch(1.0);
                Tts.speak('You have called the police. Say cancel to cancel the call.', {
                  androidParams: {
                    KEY_PARAM_STREAM: 'STREAM_VOICE_CALL',
                  },
                })
                  .catch((error) => {
                    console.log(error);
                  });
              }, (err) => {
                if (err.code === 'no_engine') {
                  Tts.requestInstallEngine();
                }
              });

          
            isCodeExecuted = true;
          }

          if (isCodeExecuted) {
            _clearState();
            // If code is already executed, start voice recognition again
            setTimeout(() => {
              Voice.start('en-US');
              console.log('Voice started 2');
            }, 7000);
          }

          


        }
        


      } else {


      }
    } else {
    }
  } 

  const handleDecline = () => {
    alarm.stop();
    Torch.switchState(false);
    Tts.stop(); // Stop TTS before stopping Voice recognition and clearing state
    Voice.stop();
    _clearState();
    clearInterval(intervalId);
    navigation.navigate('Home');
  };

  





  return (
    <View style={[styles.background, styles.View]}>
      <View style={styles.titlePurpleCalling}>
        <Text style={[styles.titleWhite]}>Lexi</Text>
        <Text style={styles.bodySmallWhite}>is calling</Text>
      </View>
      <View style={styles.viewStyle}>
        <Image style={styles.callingImage}  source={require('../assets/img/profileBig.png')} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleDecline}>
            <View  style={styles.decline} >
              <Image source={require('../assets/img/decline.png')} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      </View>
  );
}



export default CallLexi;