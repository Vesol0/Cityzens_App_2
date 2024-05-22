import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Picker from 'react-native-picker-select';
import axios from 'axios';
import { Ionicons} from '@expo/vector-icons'
/**
 * Screen statistics provides the user the ability to view a teams stats. 
 * 
 * Not all the stats from the API reponse are displayed because they are not relevant to the average user. 
 * 
 * However, they can be added if needed.
 * @param {*} param0 
 * @returns 
 */

const Statistics = ({TeamId, SelectedLeague}) => {
    const [statistic, setStatistics] = useState('');
    const [teamId, setTeamId] = useState('');
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(SelectedLeague);
    console.log('Selected League: ', selectedLeague)

    /**
     * Try to fetch the leagues for stats. 
     */
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.request({
          /**
           * get api 
           */
          method: 'GET',
          url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
          params: {
            team: TeamId,
            season: '2023'
          },
          headers: {
            'X-RapidAPI-Key': 'f0a33758c4mshab78617647e4dd4p1ab3a7jsn186794508508',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
          },
        });
        
        /**
         * Check if response data
         */
        if (response.data && response.data.response) {
          const leagueOptions = response.data.response.map(league => ({ //maps he reponse to an array of leagues.
            label: league.league.name,
            value: league.league.id
          })); 

          setLeagues(leagueOptions);
          if (leagueOptions.length > 0) {
            setSelectedLeague(leagueOptions[0].value);
          }
        } else {
          console.error('League info not found in API response');
        }
      } catch (error) {
        console.error('Error fetching league info:', error);
      }
    };

    fetchLeagues();
  }, [TeamId]);

      /**
       * Fetch the statistics 
       */
        useEffect(() => {
          const fetchStats = async () => {

              setTeamId(TeamId); // set the team id 
            try {
              const response = await axios.request({ // request statistics 
                method: 'GET',
                url: `https://api-football-v1.p.rapidapi.com/v3/teams/statistics`,
                params: {
                  team: TeamId,
                  season: '2023',
                  league: selectedLeague,
  
                },
                headers: {
                  'X-RapidAPI-Key': 'f0a33758c4mshab78617647e4dd4p1ab3a7jsn186794508508',
                  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                },
              });

              // check if response has data
      
              if (response.data && response.data.response) {
                setStatistics(response.data.response);
                console.log('Stats', statistic)
              } else {
                console.error('Stat data not found in API response');
              }
            } catch (error) { // error handling
              console.error('Error fetching stats information:', SelectedLeague, TeamId, error);
            }
          };
      
          fetchStats(); // call function
        }, [TeamId, selectedLeague]);

        if(!selectedLeague){
          <Text>No Stats Data Found</Text> // if there is no selected league display no stats data
        }

        // display ui
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Picker
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
        <Text style={styles.text}>Selected League: {selectedLeague}</Text>
        {statistic && (
          <View style={styles.statsContainer}>
            <Text style={styles.statsText}>Team Statistics:</Text>
            <Text>Goals For: {statistic.goals.for.total.total}</Text>
            <Text>Goals Against: {statistic.goals.against.total.total}</Text>
            <Text>Goal Difference: {(() => statistic.goals.for.total.total - statistic.goals.against.total.total)()}</Text>
          </View>
        )}
      </SafeAreaView>


    </View>
  )
}

// create styles

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

export default Statistics

