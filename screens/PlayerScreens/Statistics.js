import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Picker from 'react-native-picker-select';
import axios from 'axios';
import { Ionicons} from '@expo/vector-icons'
import Loading from '../../components/Loading';

/**
 * Screen Statistics gets the statistics for a Player from an API request. https://rapidapi.com/api-sports/api/api-football
 * @param {*} param0 
 * @returns 
 */
const Statistics = ({PlayerID, Team }) => {
    const [statistic, setStatistics] = useState('');
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState('39');
    const [loading, setLoading] = useState(true);
  /**
   * useEffect https://react.dev/reference/react/useEffect
   */
  useEffect(() => {

    /**
     * Fetch leagues requests the API for he players
     */
    const fetchLeagues = async () => {
      try {
        const response = await axios.request({
          method: 'GET',
          url: 'https://api-football-v1.p.rapidapi.com/v3/players',
          params: {
            id: PlayerID,
            season: '2023',
          },
          headers: {
            'X-RapidAPI-Key': 'f0a33758c4mshab78617647e4dd4p1ab3a7jsn186794508508',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
          },
        });
        
        if (response.data && response.data.response) {   // check if reponse contains data 
          const playerData = response.data.response[0];
          setStatistics(playerData);
          
          

          const leagueOptions = playerData.statistics.map(stat => ({  // map stat to a label and a value. 
            label: stat.league.name,
            value: stat.league.id,
          }));
          setLeagues(leagueOptions);

          /**
           * Check if there is leagues in the array. 
           */
          if (leagueOptions.length > 0) {
            setSelectedLeague(leagueOptions[0].value); // setState to the array.
            
          }
        } else {
          console.error('Player info not found in API response'); // display error
        }
      } catch (error) { // catch error 
        console.error('Error fetching player info:', error); // display error.
      }
    };

    fetchLeagues(); // call function fetchLeagues
  }, [PlayerID]); 
  
  
  useEffect(() => {

    /**
     * check if selectedLeague has data
     */
    if (selectedLeague) {

      //if true, fetchStats async function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

      const fetchStats = async () => {
        try {

          // set api config
          const response = await axios.request({
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/players',
            params: {
              id: PlayerID,
              season: '2023',
              league: selectedLeague,
            },
            headers: {
              'X-RapidAPI-Key': 'f0a33758c4mshab78617647e4dd4p1ab3a7jsn186794508508',
              'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
            },
          });
          
          // if response has data
          if (response.data && response.data.response) {
            setStatistics(response.data.response[0]); // add response to statistics 
            setLoading(false);
          } else {
            console.error('Stat data not found in API response'); // log error
          }
        } catch (error) {
          console.error('Error fetching team information:', error); // catch and log error
        }
      };

      fetchStats(); // call function
    }
  }, [PlayerID, selectedLeague]);

  // check if loading is true
  // if true then return loading
  if(loading){
    return(
      <Loading/>
    )
  }

  // display UI 
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Picker // react native package https://www.npmjs.com/package/@react-native-picker/picker
          value={selectedLeague}
          onValueChange={(value) => setSelectedLeague(value)}
          items={leagues}
          style={{
            inputIOS: styles.inputIOS,
            inputAndroid: styles.inputAndroid,
            placeholder: styles.placeholder,
            iconContainer: styles.iconContainer,
          }}
          useNativeAndroidPickerStyle={false} 
          placeholder={{
            label: 'Select a league...',
          }}
          Icon={() => {
            return <Ionicons name="chevron-down" size={24} color="gray" />;
          }}
        />
        {statistic && (
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>Player Statistics:</Text>
            <Text>Appearances: {statistic.statistics[0].games.appearences}</Text>
            <Text>Minutes: {statistic.statistics[0].games.minutes}</Text>
            <Text>Goals: {statistic.statistics[0].goals.total}</Text>
            <Text>Assists: {statistic.statistics[0].goals.assists}</Text>
          </View>
        )}
      </SafeAreaView>


    </View>
  );
};

// create Styles 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, 
    backgroundColor: 'white',
    width: 300,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, 
    backgroundColor: 'white',
    width: 300,
  },
  placeholder: {
    color: 'gray',
    fontSize: 16,
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
  statsContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  statsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Statistics;
