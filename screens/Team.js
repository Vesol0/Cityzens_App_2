// Team.js

import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';
import Fixture from './Fixture';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Squad from './Squad';
import Statistics from './Statistics';
import { TabScreens } from '../App';
import ClubInfo from './ClubInfo';

/**
 * The Screen teams provide user with a screen that displays the team and displays a navigator tab to go to different parts of team screen
 * @param {} param0 
 * @returns 
 */

/**
 * define function team 
 * @param {} param0 
 * @returns 
 */
const Team = ({ route }) => {
  const { TeamId, LeagueId } = route.params;
  const [team, setTeam] = useState('');

  const TopTabNav = createMaterialTopTabNavigator(); // create navigators
  const navigation = useNavigation();

  console.log('select', LeagueId)

  /**
   * Fetch Team information using API 
   */
  useEffect(() => {
    const fetchTeamInfo = async () => {
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
        // check if response has data
        if (response.data && response.data.response) {
          setTeam(response.data.response[0].team);
        } else {
          console.error('Team data not found in API response');
        }
      } catch (error) { // error handling
        console.error('Error fetching team information:', error);
      }
    };

    fetchTeamInfo();
  }, [TeamId]);

  /**
   * Display UI
   * 
   * Wrapping a navigation container around everything and setting independent to true to avoid errors. 
   */

  return (
    <NavigationContainer independent={true}>
    <SafeAreaView style={styles.container}>
      {team && (
        <View style={styles.container}>
          <Image source={{uri: team.logo}} style={{height: 50, width: 50}}/>
          <Text style={styles.teamName}>{team.name}</Text>
          
        </View>
      )}
    </SafeAreaView>
    <TopTabNav.Navigator style={{marginTop: 25}}>
            <TopTabNav.Screen name="Squad" component={() => (<Squad TeamId={TeamId} navigation={navigation}/>)}/>
            <TopTabNav.Screen name="Fixture" component={() => (<Fixture TeamID={TeamId} navigation={navigation}/>)}/>
            <TopTabNav.Screen name="Stats" component={() => (<Statistics TeamId={TeamId} SelectedLeague={LeagueId}/>)}/>
            <TopTabNav.Screen name="Info" component={() => (<ClubInfo TeamId={TeamId}/>) } />
          </TopTabNav.Navigator>
    </NavigationContainer>
    
  );
};

// create styles
const styles = StyleSheet.create({
  container: {
    flex: 0, 
    alignItems: 'center',
    marginTop: 10,
  
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Team;
