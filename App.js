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
import Tutorial1 from './screens/Tutorial1';
import Tutorial2 from './screens/Tutorial2';
import Tutorial3 from './screens/Tutorial3';






const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator>
      
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{headerShown: false}}  />
        <Stack.Screen name="ProfilePicture" component={ProfilePictureScreen}  options={{headerShown: false}}  />
        <Stack.Screen name="Tutorial1" component={Tutorial1} options={{headerShown: false}}  />
        <Stack.Screen name="Tutorial2" component={Tutorial2} options={{headerShown: false}}  />
        <Stack.Screen name="Tutorial3" component={Tutorial3} options={{headerShown: false}}  />

        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}} />
        <Stack.Screen name="Call" component={CallScreen} options={{headerShown: false}}  />
        <Stack.Screen name="friendRequest" component={FriendRequest}  options={{headerShown: false}} />
        <Stack.Screen name="Friends" component={FriendsScreen} options={{headerShown: false}}  />

      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
};

export default App;