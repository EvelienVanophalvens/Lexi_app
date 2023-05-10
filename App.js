import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserProvider from './components/userProvider';

import LoginScreen from './screens/Login';
import RegistrationScreen from './screens/Registration';
import ProfilePictureScreen from './screens/ProfilePicture';
import HomeScreen from './screens/Home';
import SettingsScreen from './screens/Settings';
import CallScreen from './screens/Call';
import FriendRequest from './screens/friendRequest';
import FriendsScreen from './screens/Friends';




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
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Call" component={CallScreen} />
        <Stack.Screen name="friendRequest" component={FriendRequest} />
        <Stack.Screen name="Friends" component={FriendsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
};

export default App;