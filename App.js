import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserProvider from './components/userProvider';

import LoginScreen from './screens/Login';
import RegistrationScreen from './screens/Registration';
import ProfilePictureScreen from './screens/ProfilePicture';
import HomeScreen from './screens/Home';



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="ProfilePicture" component={ProfilePictureScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
};

export default App;