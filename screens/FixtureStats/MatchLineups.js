import React, { useState, useEffect} from 'react'
import { View, StyleSheet, ScrollView, Text, Image, FlatList} from 'react-native'
import axios from 'axios';
import Loading from '../../components/Loading';
/**
 * This screen displays the Match Lineups, which uses the parameters passed through (FixtureID, TeamID) to get fetch the linups from the API https://rapidapi.com/api-sports/api/api-football
 * @param {} param0 
 * @returns 
 */

const MatchLineups = ({FixtureID, TeamID}) => {
    const [homeLineup, setHomeLineup] = useState([]);
    const [awayLineup, setAwayLineup] = useState([]);
    const [homeformation, setHomeFormation] = useState('');
    const [awayformation, setAwayFormation] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchLineup= async () => {
          try {

            /**
             * Request API for Lineups 
             */
            const response = await axios.request({
              method: 'GET',
              url: `https://api-football-v1.p.rapidapi.com/v3/fixtures/lineups`,
              params: {
                fixture: FixtureID,
              },
              headers: {
                'X-RapidAPI-Key': 'f0a33758c4mshab78617647e4dd4p1ab3a7jsn186794508508',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
              },
            });

            /**
             * check if Reponse has data
             * if response has data
             * change the state of Home and away lineups. 
             * also set formations of both respective teams.
             */
            if (response.data && response.data.response) {
              setHomeLineup(response.data.response[0].startXI);
              setAwayLineup(response.data.response[1].startXI);
              setHomeFormation(response.data.response[0].formation)
              setAwayFormation(response.data.response[1].formation)
              setIsLoading(false); // set loading to false 
              
              console.log("Lineup",lineup, FixtureID, TeamID) // display error.
            } else {
              console.error('Lineup data not found in API response');
            }
          } catch (error) {
            console.error('Error fetching Lineup information:', error);
          
          }
        };
    
        fetchLineup(); // call function
      }, []);

      /**
       * check if loading 
       */
      if(isLoading){
        return(
          <Loading/>
        )
      }

      /**
       * build ui 
       */
  return (
    <View style={styles.container}>
      <View className="flex-row content-center">
        <View className="items-center">
        <Text style={styles.playerText}>Formation:{homeformation}</Text>
        <FlatList scrollEnabled={false}
        data={homeLineup}
        keyExtractor={(item) => item.player.id.toString()}
        renderItem={({ item }) => (
            <View style={styles.row}>
                <View style={{}}>
                
                <Text style={styles.playerText}>{item.player.name}</Text>
                </View>
        
            </View>

        )}
      />
      </View>
<View className="items-center">
  <Text style={styles.playerText}>Formation:{awayformation}</Text>
<FlatList scrollEnabled={false}
        data={awayLineup}
        keyExtractor={(item) => item.player.id.toString()}
        renderItem={({ item }) => (
            <View style={styles.row}>
                <View style={{}}>
                <Text style={styles.playerText}>{item.player.name}</Text>
                </View>
        
            </View>

        )}
      />
      </View>
    </View>
    </View>
  )
}

/**
 * create an object for Styles
 */

const styles = StyleSheet.create({
    container: {
      flex: 0,
      padding: 15,
      backgroundColor: '#f0f0f0',
      alignItems: 'center'
    },
    formation: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    row: {
        
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
      marginHorizontal: 20,
      
    },
    player: {
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 25,
      alignItems: 'center',
    },
    playerText: {
      fontSize: 17,
      fontWeight: '600'
    },
  });

export default MatchLineups