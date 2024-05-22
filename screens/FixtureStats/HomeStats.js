import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, FlatList, Text, Alert, StyleSheet, ScrollView } from 'react-native'
import axios from 'axios'
import Loading from '../../components/Loading';

/**
 * 
 * @param {*} param0 
 * 
 * This Screen displays the Home Stats, it fetches the stats from the API (API-Football ) https://rapidapi.com/api-sports/api/api-football
 * @returns 
 */

const HomeStats = ({fixtureID, TeamID}) => {

    const [fixtureStats, setFixtureStats] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [FixtureID, setFixtureID] = useState('');
    const [teamID, setTeamID] = useState('');

    useEffect(() => {
        const fetchFixureStats= async () => {
            setFixtureID(fixtureID);
            setTeamID(TeamID);
          try {

             /**
             * Try make a request to the API 
             */
            const response = await axios.request({
              method: 'GET',
              url: `https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics`,
              params: {
                fixture: FixtureID,
                team: teamID,
                
              },
              headers: {
                'X-RapidAPI-Key': 'f0a33758c4mshab78617647e4dd4p1ab3a7jsn186794508508',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
              },
            });
            
            /**
             * if response has data then update state of fixtureStats
             */
            if (response.data && response.data.response) {
              setFixtureStats(response.data.response[0].statistics);
              setIsLoading(false); //loading = false
              console.log("Fixture",fixtureStats)
            } else {
              console.error('Fixture data not found in API response'); // display error
            }
          } catch (error) {
            console.error('Error fetching fixture stat information:', error);
          
          }
        };
    
        fetchFixureStats();
      }, [FixtureID]);


      /**
       * if loading return loading
       */
      if(isLoading){
        return(
            <Loading/>
        )
      }

      const getStatistic = (type) => {
        const stat = fixtureStats.find(stat => stat.type === type);
        return stat ? stat.value : 'N/A'
      }
  return (
    /**
     * Build UI 
     */
    <ScrollView>
    <SafeAreaView style={{flex:0, alignItems: 'center', marginTop: 5}}>
    <View>
          <View style={{flexDirection: 'column', columnGap: 10}}>
            <View style={styles.row}>
            <Text style={{textAlign: 'left', fontSize: 20, paddingHorizontal: 5 }}>Shots: {getStatistic('Total Shots')}</Text>
            </View>
            <View style={styles.row}>
            <Text style={{textAlign: 'left', fontSize: 20, paddingHorizontal: 5 }}>Shots on Target: {getStatistic('Shots on Goal')}</Text>
            </View>
            <View style={styles.row}>
            <Text style={{textAlign: 'left', fontSize: 20, paddingHorizontal: 5 }}>Possession: {getStatistic('Ball Possession')}</Text>
            </View>
            <View style={styles.row}>
            <Text style={{textAlign: 'left', fontSize: 20, paddingHorizontal: 5 }}>Passes: {getStatistic('Total passes')}</Text>
            </View>
            <View style={styles.row}> 
            <Text style={{textAlign: 'left', fontSize: 20, paddingHorizontal: 5 }}>Pass Accuracy: {getStatistic('Passes %')}</Text>
            </View>
            </View>
    </View>
    </SafeAreaView>
    </ScrollView>
  )
}

/**
 * Create styles object
 */
const styles = StyleSheet.create({
  row:{
    backgroundColor: '#E0E0E0',
    padding: 10,
    marginVertical: 8
  }
})

export default HomeStats