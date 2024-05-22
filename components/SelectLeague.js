import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Picker from 'react-native-picker-select';
import axios from 'axios';
import { Ionicons} from '@expo/vector-icons'

const LeaguePicker = ({ TeamID }) => {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('');

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.request({
          method: 'GET',
          url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
          params: {
            team: TeamID,
          },
          headers: {
            'X-RapidAPI-Key': 'f0a33758c4mshab78617647e4dd4p1ab3a7jsn186794508508',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
          },
        });

        if (response.data && response.data.response) {
          const leagueOptions = response.data.response.map(league => ({
            label: league.league.name,
            value: league.league.name
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
  }, [TeamID]);

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
            value: null,
          }}
          Icon={() => {
            return <Ionicons name="chevron-down" size={24} color="gray" />;
          }}
        />
        <Text style={styles.text}>Selected League: {selectedLeague}</Text>
      </SafeAreaView>
    </View>
  );
};

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
      paddingRight: 30, // to ensure the text is never behind the icon
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
      paddingRight: 30, // to ensure the text is never behind the icon
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
  });

export default LeaguePicker;
