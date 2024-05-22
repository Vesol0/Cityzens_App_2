import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import Team from './Team';
/**
 * This is a screen that displays Club releated Info 
 * @param {*} param0 
 * @returns 
 */
const ClubInfo = ({TeamId}) => {
    const [teamId, setTeamId] = useState('');
    const [info, setInfo] = useState('');

    const TopTabNav = createMaterialTopTabNavigator();
    useEffect(() => {
        const fetchClubInfo = async () => {
            setTeamId(TeamId);
          try {
            const response = await axios.request({
              method: 'GET',
              url: `https://api-football-v1.p.rapidapi.com/v3/teams`,
              params: {
                id: TeamId,
              },
              headers: {
                'X-RapidAPI-Key': 'f0a33758c4mshab78617647e4dd4p1ab3a7jsn186794508508',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
              },
            });
    
            if (response.data && response.data.response) {
              setInfo(response.data.response[0]);
            } else {
              console.error('Team info data not found in API response');
            }
          } catch (error) {
            console.error('Error fetching team information:', error);
          }
        };
    
        fetchClubInfo();
      }, [TeamId]);


  return (
    <View style={styles.container}>
      {info &&
      <View>
        <View className="flex-row gap-5"> 
        <Text style={styles.textHeader}>Name:</Text>
        <Text style={styles.textHeader}>{info.team.name}</Text>
        </View>
        <View className="flex-row gap-5">
        <Text style={styles.textHeader}>Founded</Text>
        <Text style={styles.textHeader}>{info.team.founded}</Text>
        </View>
        <View className="m-5 flex-0 bg-slate-400 content-evenly" style={{borderRadius: 5}}>
        <Text style={{fontSize: 25, fontWeight: 700, textAlign: 'center'}}>Stadium</Text>
        <Text style={{fontSize: 25, fontWeight: 700, textAlign: 'center'}}>{info.venue.name}</Text>
        <Image source={{uri: info.venue.image }} style={{height: 200, width: 300, margin: 25}}/>
        </View>
        </View>

        
         }
    </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center'
    },

    textHeader: {
        fontSize: 20,
        fontWeight: 500,
    }
});

export default ClubInfo