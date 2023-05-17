import react, {useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, TouchableWithoutFeedback } from 'react-native';
import {styles} from '../Styles';
import { useNavigation } from '@react-navigation/native';

const Tutorial2 = ({navigation}) => {



    return (
        <View style={[styles.View, styles.background]}>
        <Image source={require('../assets/img/tutorial2.png')} style={ [styles.icon, styles.marginTop, styles.marginRight ]}/>
        <Text style={[styles.title, styles.marginTop]}>Code words</Text>
        <View style={styles.alignCenter}>
        <Text style={[styles.body]}>In your settings you can select different kind of words to have as code word. With those code words you can let your light sign of a sound play in real emergency you can call the emergency services.</Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Tutorial3')}>
            <Image source={require('../assets/img/next.png')} style={ [styles.iconBig, styles.alignCenter, styles.marginTop2 ]}/>
        </TouchableWithoutFeedback>
        </View>
        </View>
                

    )

}

export default Tutorial2;
