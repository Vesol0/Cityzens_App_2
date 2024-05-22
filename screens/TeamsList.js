
import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Picker from 'react-native-picker-select';
import axios from 'axios';
import Loading from '../components/Loading';

/**
 * Screen Teams List provides the user with a list of teams from a league of their chosing 
 * 
 * * Note, they can only pick the following leagues(La Liga, Serie A, Bundesliga, Premier League, Ligue 1)
 * @param {} param0 
 * @returns 
 */

const TeamsList = ({Navigator}) => { // pass through navigator 

const TopTabNav = createMaterialTopTabNavigator();
  const [selectedLeague, setSelectedLeague] = useState('39');
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const navigator = Navigator;

  // navigate to team screen when an element is pressed 
  const handleTeamPress = (teamId, leagueid) => {
    Navigator.navigate('Team', { 
      
      TeamId: teamId,
      LeagueId: leagueid });
  };

  /**
   * Fetch teams using standings from leagues
   * 
   */

  useEffect(() => {
    const fetchTeams = async () => {
        try {
          const response = await axios.request({ method: 'GET',
          url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
          params: {
            season: '2023',
            league: selectedLeague // Premier League ID
          },
          headers: {
            'X-RapidAPI-Key': 'f0a33758c4mshab78617647e4dd4p1ab3a7jsn186794508508',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
          }});
  
          // Check if response contains data
          if (response.data && response.data.response && response.data.response[0] && response.data.response[0].league) {
            setTeams(response.data.response[0].league.standings[0]);
            setIsLoading(false);
            
          }
          else {
            console.error(response.data)
            console.error('Teams data not found in API response');
          }
        } catch (error) {
          console.error('Error fetching Premier League table:', error);
        }
    }

    fetchTeams();
  }, [selectedLeague])
 

  //check if elements are loading

  if(isLoading){
    return(
      <Loading/>
    )
  }

  // display UI 
  return (
    <View>
        <View style={styles.container}>
      <Picker
          value={selectedLeague}
          onValueChange={(value) => setSelectedLeague(value)}
          darkTheme={true}
          items={[
            {label: 'Premier League', value: '39'},
            {label: 'Serie A', value:'135'},
            {label: 'Bundesliga', value: '78'},
            {label: 'La Liga', value: '140'},
            {label: 'Ligue 1', value: '61'},
          ]}
          style={{
            inputIOS: styles.inputIOS,
            inputAndroid: styles.inputAndroid,
            placeholder: styles.placeholder,
            iconContainer: styles.iconContainer,
          }}
          useNativeAndroidPickerStyle={false} 
          placeholder={{
            label: 'Select a league...',
            value: '39',
          }}
        />
        <View className="m-3">
        <FlatList
        contentContainerStyle={{paddingBottom: 230}}
        data={teams}
        keyExtractor={(item) => item.rank.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={{borderRadius: 25, borderWidth: 2, margin: 10}}onPress={() => handleTeamPress(item.team.id, selectedLeague)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5, gap: 5}}>
            <Image source={{uri: item.team.logo}} style={styles.logo}></Image>
              <Text style={{fontSize: 20}}>{item.team.name}</Text>
            </View>
          </TouchableOpacity>

        )}
      />
      </View>

        
      </View>
    </View>
  )
}

// create styles

const styles = StyleSheet.create({
    container: {
      flex: 0,
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
    logo: {
      height: 20,
      width: 20,
     
    },
  });

export default TeamsList