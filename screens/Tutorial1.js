import react, {useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, TouchableWithoutFeedback } from 'react-native';
import {styles} from '../Styles';


const Tutorial1 = ({ navigation }) => {



    return (
        <View style={[styles.View, styles.background]}>
        <Image source={require('../assets/img/tutorial1.png')} style={ [styles.icon, styles.marginTop, styles.alignCenter ]}/>
        <Text style={[styles.title, styles.marginTop]}>Add a friend</Text>
        <View style={styles.alignCenter}>
        <Text style={[styles.body]}>You can add friends to the list of people you can call.</Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Tutorial2')}>
            <Image source={require('../assets/img/next.png')} style={ [styles.iconBig, styles.alignCenter, styles.marginTop3 ]}/>
        </TouchableWithoutFeedback>
        </View>
        </View>
                

    )

}

export default Tutorial1;
