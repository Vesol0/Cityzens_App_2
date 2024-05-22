import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, SafeAreaView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Loading from '../components/Loading';
const API_KEY = 'f0a33758c4mshab78617647e4dd4p1ab3a7jsn186794508508'; // Your RapidAPI Key
/**
 * This screen displays the standings for a league. 
 */


// create styles

const styles = StyleSheet.create({
  container: {
      flex: 1, 
      alignItems:'center',
      padding: 10,
      justifyContent: 'center'
      
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



/**
 * league table function
 * 
 * displays a league table based on the selected league id. 
 * @param {} param0 
 * @returns 
 */

const PremierLeagueTable = ({LeagueID, navigation}) => {
  const [leagueTable, setLeagueTable] = useState([]);
  const [leagueLogo, setLeagueLogo] = useState('');
  const [isLoading, setisLoading] = useState(true);
  const [leagueID, setLeagueID] = useState(LeagueID)

  /**
   * Function handles teams press allows the user to press on a team in standings and navigate to the team's screen.
   * @param {*} teamId 
   * @param {*} leagueid 
   */
  const handleTeamPress = (teamId, leagueid) => {
    navigation.navigate('Team', { 
      
      TeamId: teamId,
      LeagueId: leagueid });
  };

  useEffect(() => {
    const fetchLeagueTable = async () => {
      setLeagueID(leagueID);
      try {
        const response = await axios.request({ method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
        params: {
          season: '2023',
          league: LeagueID // Premier League ID
        },
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }});

        // Check if response contains data
        if (response.data && response.data.response && response.data.response[0] && response.data.response[0].league) {
          setLeagueTable(response.data.response[0].league.standings[0]);
          setisLoading(false);
          
        }
        else {
          console.error(response.data)
          console.error('Standings data not found in API response');
        }
      } catch (error) {
        console.error('Error fetching Premier League table:', error);
      }

      

      
    };

    fetchLeagueTable();
  }, []);

  // check if loading = true
  if(isLoading){
    return(
      <Loading/>
    )
  }


/**
 * create UI 
 */
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
        <View className="bg-slate-300">
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Pos</Text>
          <Text style={styles.headerText}>Team</Text>
          <Text style={styles.headerText}>Points</Text>
          <Text style={styles.headerText}>Won</Text>
          <Text style={styles.headerText}>Draw</Text>
          <Text style={styles.headerText}>Lost</Text>
          <Text style={styles.headerText}>GD</Text>
        </View>
          <FlatList
        data={leagueTable}
        keyExtractor={(item) => item.rank.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity className="bg-slate-500" style={styles.row} onPress={() => handleTeamPress(item.team.id, leagueID)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{uri: item.team.logo}} style={styles.logo}></Image>
              <Text style={styles.cellText}>{item.rank}</Text>
              <Text style={styles.cellText}>{item.team.name}</Text>
              <Text style={styles.cellText}>{item.points}</Text>
              <Text style={styles.cellText}>{item.all.win}</Text>
              <Text style={styles.cellText}>{item.all.draw}</Text>
              
              <Text style={styles.cellText}>{item.all.lose}</Text>
              <Text style={styles.cellText}>{item.goalsDiff}</Text>
  
            </View>
          </TouchableOpacity>

        )}
      />
      </View>
      <Image source={{uri: leagueLogo}} style={styles.Image}></Image>
      </ScrollView>
      
      </SafeAreaView>

    </View>
      
    
  );

  
};
export default PremierLeagueTable; 
