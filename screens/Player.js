import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, StyleSheet, Image, SafeAreaView } from 'react-native'
import axios from 'axios';
import Loading from '../components/Loading';
import SeasonPicker from '../components/SeasonPicker';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Statistics from './PlayerScreens/Statistics';
import PlayerInfo from './PlayerScreens/PlayerInfo';

/**
 * Screen Player allows the user to navigate to a player and view their stats and information related to the player. 
 * 
 * @param {*} param0 
 * @returns 
 */

const Player = ({ route }) => { // import route parameters via navigator. 
    const { PlayerId, Team} = route.params; 
    const [player, setPlayer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const TopTabNav = createMaterialTopTabNavigator();
  

    useEffect(() => {

      /**
       * Try to fetch Player 
       */
        const fetchPlayer = async () => {
          try {
            const response = await axios.request({
              method: 'GET',
              url: `https://api-football-v1.p.rapidapi.com/v3/players`,
              params: {
                id: PlayerId,
                season: '2023',
              },
              headers: {
                'X-RapidAPI-Key': 'f0a33758c4mshab78617647e4dd4p1ab3a7jsn186794508508',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
              },
            });

            /**
             * check if response contains data 
             */
    
            if (response.data && response.data.response) {

              // if true then 
              setIsLoading(false); // set loading false
              setPlayer(response.data.response[0]); //change state of player
            } else {
              console.error('Playerdata not found in API response');
            }
          } catch (error) {
            console.error('Error fetching player information:', error); // display error
          }
        };
    
        fetchPlayer(); // call function. 
      }, [PlayerId]);

      if(isLoading){
        return(
          <Loading/>
        )
      }

      
        
     // display ui  

  return (
    <NavigationContainer independent={true}>
    <SafeAreaView style={styles.container}>
      {player && 

        <View>
        <Image source={{uri: player.player.photo}} style={{height: 50, width: 50, borderRadius: 50, alignSelf: 'center'}}/>
        <Text style={{fontSize: 20, fontWeight: '600'}}>{player.player.name}</Text>
        <Text style={{fontSize: 15, fontWeight: '400', textAlign: 'center', marginTop: 10}}>{Team.name}</Text>
       
      
        
        
        </View>
      }
    </SafeAreaView>
    { player &&
    <TopTabNav.Navigator style={{marginTop: 25}}>
      <TopTabNav.Screen name="Stats" component={() => (<Statistics PlayerID={PlayerId}/>)}/>
      <TopTabNav.Screen name="Info" component={() => (<PlayerInfo PlayerInfo={player}/>)}/>

    </TopTabNav.Navigator>
}
    </NavigationContainer>
  )
}

// Create Styles for Styling. 

const styles = StyleSheet.create({
    container: {
        flex: 0, 
        alignItems:'center',
        padding: 0,
        marginTop: 25,
        
    },
    btn: {
        alignSelf: 'center',
        paddingHorizontal:60,
        paddingVertical: 20,
        borderRadius:50,
  
    },
    inputField: {
      fontSize: 30,
      fontWeight: "300",
      padding: 15,
      textAlign: 'center',
      letterSpacing: 3
  
    },
    input: {
      borderWidth: 2,
      borderRadius:50,
      fontSize: 15,
      marginLeft: 15,
      marginRight: 15,
      padding: 15
    },
    txt: {
      fontSize: 20,
      
    },
    table: {
  
    },
    logo: {
      height: 20,
      width: 20,
     
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 3,
      paddingVertical: 2,
      paddingHorizontal: 2,
      backgroundColor: '#f2f2f2',
      borderRadius: 5,
    },
    cell: {
      flex: 1,
      textAlign: 'center',
      fontSize: 13,
      backgroundColor:'#dae0db',
      flexDirection: 'row',
      alignItems: 'center',
    },
  
    tableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: 10,
      paddingHorizontal: 5,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 12,
      flex: 1,
      textAlign: 'center',
    },
    cellText: {
      fontSize: 10,
      flex: 1,
      textAlign: 'center',
      fontWeight: '500',
    
      
    },
  
  
  })

export default Player