import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, FlatList, TextInput, Pressable, Image } from 'react-native';
import UserContext from '../components/userContext';
import Friends from '../components/friends2';
import SearchResults from '../components/friends3';
import Switch from '../components/switch';
import {styles} from '../Styles.js';


const FriendsScreen = ({ navigation }) => {
  const { id } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [searchValue , setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);



  useEffect(() => {
    fetch('https://evelienvanophalvens.be/Lexi/allFriends.php', {
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
        setFriends(data.Data);

      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

 

  const search = () => {
    console.log(searchValue);
    fetch('https://evelienvanophalvens.be/Lexi/searchFriends.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            search: searchValue,
            id: id,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setSearchResults(data.users);
        })
        .catch(error => {
            console.error(error);
        })
     
    }

    addFriend = (Friendid) => {
        fetch('https://evelienvanophalvens.be/Lexi/addFriend.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                friend: Friendid,
                id: id,
            }),
        })

    }

    deleteFriend = (Friendid) => {
        fetch('https://evelienvanophalvens.be/Lexi/deleteFriend.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                friend: Friendid,
                id: id,
            }),
            
        })
        .then(response => response.json())
        .then(data => {
          setFriends(data.Data);
  
        })
        .catch(error => {
          console.error(error);
        });
    }
    







  return (
    <ScrollView>
      <View style={styles.View}>
        <View>
          <View style={styles.titlePurple}>
            <Text style={[styles.titleWhite]}>Friends</Text>
          </View>
        </View>
        <View style={styles.input3}>
            <Image source={require('../assets/img/search.png')} style={styles.searchIcon}/>
            <TextInput
                name={"search"}
                placeholder={"search"}
                placeholderTextColor="black"
                style={styles.input3txt}
                onChangeText={setSearchValue}
                onSubmitEditing={search}
                />
        </View>
        <FlatList
          style={styles.friends}
          numColumns={1}
          data={searchResults}
          renderItem={({ item }) => (
            <SearchResults
              id={item.id}
              name={item.firstname}
              image={item.profilePicture}
              onAddFriend={() => addFriend(item.id)}
            />
          )}
        />

<Text style={styles.subTitle}>Your Friends</Text>
        <FlatList
          style={styles.friends}
          numColumns={1}
          data={friends}
          renderItem={({ item }) => (
            <Friends
              id={item.id}
              name={item.firstname}
              image={item.profilePicture}
              onDeleteFriend={() => deleteFriend(item.id)}
            />
          )}
        />
     
      </View>
    </ScrollView>
  );
}

export default FriendsScreen;