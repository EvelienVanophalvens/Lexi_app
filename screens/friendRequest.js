import react, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback } from 'react-native';

import Friendrequest from '../components/friendRequest';
import UserContext from '../components/userContext';

import {styles} from '../Styles';



const FriendRequest = ({ navigation }) => {
    const [friendRequest, setFriendRequest] = useState([]);
    const { id }  = useContext(UserContext);
    console.log(id);

    useEffect(() => {
        fetch('https://evelienvanophalvens.be/Lexi/friendRequest.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
          }),
        })
        .then(response => response.json())
        .then(data => {
            setFriendRequest(data.Data);
            console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
      }, []);

        
    const onAcceptedFriend = (friendRequestId) => {
        fetch('https://evelienvanophalvens.be/Lexi/acceptFriend.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                friendRequest: friendRequestId,
                id: id,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setFriendRequest(data.Data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    const onRejectedFriend = (friendRequestId) => {
        console.log("rejected");
        fetch('https://evelienvanophalvens.be/Lexi/rejectFriend.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                friendRequestId: friendRequestId,
                id: id,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setFriendRequest(data.Data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    

    return (
        <View style={styles.View}>
            <View style={styles.titlePurple}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Image style={styles.icon} source={require('../assets/img/backArrow.png')} />
            </TouchableWithoutFeedback>
                <Text >Friend requests</Text>
            </View> 
            <FlatList //lussen, zoals for loop
            style = {styles.friends}
            numColumns={1}
            data={friendRequest}
            renderItem={({ item }) => (
          <Friendrequest
            id = {item.id}
            name={item.firstname}
            image={item.profilePicture}
            friendRequest={item.friendRequest}
            onAcceptedFriend={(id) => onAcceptedFriend(id)}
            onRejectFriend={(id) => onRejectedFriend(id)}
          />
        )}
      />
        </View>
    )
}



export default FriendRequest;


