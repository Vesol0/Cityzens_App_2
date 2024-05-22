import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, SafeAreaView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';

/**
 * 
 * This screen gets and displays the fixtures based on the Team. 
 * Currently this app only supports the current season (2023/24);
 * 
 */

const API_KEY = 'f0a33758c4mshab78617647e4dd4p1ab3a7jsn186794508508'; // Api key
const options = {
  method: 'GET',
  url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
  params: {
    season: '2023',
    team: '50', // Premier League ID
  },
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
};

/**
 * This function gets the API request and sets the fixture useState to the fixture that was sent by the API.
 * 
 * 
 * @param {*} param0 
 * @returns 
 */
export default function Fixture({TeamID, navigation}) {
    const [fixture, setfixture] = useState('');
    const [currentFixture, setCurrentFixture] = useState('');
    const [teamId, setTeamId] = useState('');
    useEffect(() => {

      /**
       * Async function to fetch the fixture information 
       * 
       * 
       */
        const fetchFixture = async () => {
          setTeamId(TeamID)
          try {
            const response = await axios.request({
              method: 'GET',
              url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
              params: {
                season: '2023',
                team: TeamID // Premier League ID
              },
              headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
              }
            });
    
            // Check if response contains data
            if (response.data && response.data.response && response.data.response[0] && response.data.response) {
              setfixture(response.data.response);
              
              
            }
            else {
              console.error('Fixture data not found in API response');
            }

            //catch  
          } catch (error) {
            console.error('Error fetching Fixture Information:', error); // display error 
          }
        };
    
        fetchFixture(); // call function
      }, [TeamID])


      /**
       * function handleFixturePress will take responsibility of navigating when he user press on a fixture.
       * @param {} FixtureData 
       */
      const handleFixturePress = (FixtureData) => {
        console.log('Fixture Data', FixtureData)
        navigation.navigate('ViewFixture', {FixtureData})
        
      }
  return (
    <View style={styles.container}>
      <SafeAreaView>
      <FlatList // flatlist to play the fixture information 
        data={fixture}
        keyExtractor={(item) => item.fixture.timestamp}
        renderItem={({ item }) => (
          
          <TouchableOpacity className=" bg-slate-300 m-4" style={{borderRadius: 25}} onPress={() => handleFixturePress(item)}>
            <View className="items-center">
            <View style={{flexDirection: 'row', gap: 10, margin: 10}}>
              <Text style={styles.txt}>{item.teams.home.name}</Text>
              <Text style={styles.txt}>VS</Text>
              <Text style={styles.txt}>{item.teams.away.name}</Text>
            </View>
            <View style={{flexDirection: 'row', gap: 10, margin: 10, alignItems: 'center'}}>
              <Text style={styles.txt} className="row-span-1">{item.goals.home}</Text>
              <Text style={styles.txt}>-</Text>
              <Text style={styles.txt}>{item.goals.away}</Text>
            </View>
            <Image source={{uri: item.league.logo}} style={{height: 25, width: 25, margin: 5}}/>
            </View>

              
              
            
          </TouchableOpacity>

        )}
      />
      </SafeAreaView>
      
    </View>
  )
}

// Create styles

const styles = StyleSheet.create({
  container: {
      flex: 1, 
      alignItems:'center'
      
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
    textAlign: 'center',
  },
  table: {
  },
  logo: {
    height: 25,
    width: 25,
  }, 
  box: {
    
  }


})
