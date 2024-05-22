import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import axios from 'axios';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Player from './Player';
import Loading from '../components/Loading';

/**
 * This screen gets the squad of a team 
 * 
 * The api reads in the Team ID that was passed through. 
 * 
 * The Api will get the team by the Team id. 
 * @param {*} param0 
 * @returns 
 */
const Squad = ({TeamId, navigation}) => {
    const [squad, setSquad] = useState(['']);
    const [teamId, setTeamId] = useState('');  
    const [isLoading, setisLoading] = useState(true);
    const [playerId, sePlayerId] = useState('');
    const [teamInfo, setTeamInfo] = useState(['']);

    const Navigator = useNavigation();

    /**
     * This function provides the functionality of pressing a player and loading to that player.
     * @param {} PlayerId 
     * @param {*} Team 
     */
    const handlePlayerPress = (PlayerId, Team) => {
      console.log(PlayerId)
     navigation.navigate('Player', { PlayerId, Team});
    };
    
    /**
     * try to fetch squad
     * 
     * 
     */
    useEffect(() => {
      /**
       * fetch squad async function
       * 
       * tries to request API 
       * 
       * if there is data then set the squad. 
       */
        const fetchSquad = async () => {
            setTeamId(TeamId);
          try {
            const response = await axios.request({
              method: 'GET',
              url: `https://api-football-v1.p.rapidapi.com/v3/players/squads`,
              params: {
                team: TeamId,
              },
              headers: {
                'X-RapidAPI-Key': 'f0a33758c4mshab78617647e4dd4p1ab3a7jsn186794508508',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
              },
            });
    
            if (response.data && response.data.response) {
              setSquad(response.data.response[0].players);
              setTeamInfo(response.data.response[0].team)
              console.log('Team Info', teamInfo);
              setisLoading(false);
            } else {
              console.error('Squad data not found in API response');
            }
          } catch (error) {
            console.error('Error fetching team information:', error);
          
          }
        };
    
        fetchSquad();
      }, [TeamId]);

      // if loading 
      // display loading screen

      if(isLoading){
        return(
          <Loading/>
        )
      }

      // display ui

  return (
    <View className="flex m-6 justify-center">
      
        <FlatList
            data={squad}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.box} className="bg-slate-300" onPress={() => handlePlayerPress(item.id, teamInfo)}>
                    <View className="flex-row gap-2">
                      <View>
                        <Text style={styles.txt}>{item.number}</Text>
                      </View>
                        <View>
                            <Text style={styles.txt}>{item.name}</Text>
                        </View>
                        <View className="ml-5">
                            <Image source={{uri: item.photo}} style={{height: 50, width: 50, borderRadius: 25}}/>
                        </View>
                    </View>
                    <View>
                      <Text style={styles.txt}>{item.position}</Text>
                    </View>
                    
                </TouchableOpacity>
        )}
        
        />
      
    </View>

  )
}
 
// create styles
const styles = StyleSheet.create({
    txt: {
        fontSize: 20,
        textAlign: 'center',
        includeFontPadding: false,
        textAlignVertical: 'center'
    },
    box: {
        margin: 12,
        padding: 5,
        borderRadius: 25,
        alignItems: 'center',
        
        
    }
})

export default Squad
