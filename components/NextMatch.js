import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, SafeAreaView, Image, FlatList, Pressable, ScrollView } from 'react-native'
import axios from 'axios';


const API_KEY = 'f0a33758c4mshab78617647e4dd4p1ab3a7jsn186794508508'; // Your RapidAPI Key
const options = {
  method: 'GET',
  url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
  params: {
    next: 1,
    team: 50,
  },
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
};

export default function NextMatch() {

  const [fixtures, setFixture] = useState(null);
  const [leagueLogo, setLeagueLogo] = useState('');

  useEffect(() => {
    const fetchUpcomingFixture = async () => {
      try {
        const response = await axios.request(options);

        // Check if response contains data
        if (response.data && response.data.response && response.data.response[0] && response.data.response) {
         setFixture(response.data.response[0]);
  
          
        }
        else {
          console.error(response.data)
          console.error('Standings data not found in API response');
        }
      } catch (error) {
        console.error('Error fetching Premier League table:', error);
      }
    };

    fetchUpcomingFixture();
  }, []);
    return (
      <View style={styles.container} className="bg-slate-400">
      {fixtures && (
        <View className="p-6">
          <Text style={styles.txt}>{fixtures.fixture.venue.name}</Text>
          <View style={styles.row}>
          <View>
            <Image source={{uri: fixtures.teams.home.logo}} style={styles.logo}></Image>
            <Text style={styles.txt}>{fixtures.teams.home.name}</Text>
          </View>
          <Text style={styles.txt} className="self-center">VS</Text>
        
          <View>
            <Image source={{uri: fixtures.teams.away.logo}} style={styles.logo}></Image>
            <Text style={styles.txt}> {fixtures.teams.away.name}</Text>
          </View>
          </View>
        </View>
        
  
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
      
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
    textAlign: 'center'
  },
  table: {

  },
  logo: {
    height: 75,
    width: 75,
    margin:10,

  }, 
  venue: {
    

  },
  row:{
    flexDirection: 'row',
  }
})
