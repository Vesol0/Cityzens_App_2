import React, {useEffect, useState} from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import Picker from 'react-native-picker-select';
import axios from 'axios';

const SeasonPicker = ({PlayerId}) => {
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState('');
    useEffect(() => {
        const fetchSeason = async () => {
          try {
            const response = await axios.request({
              method: 'GET',
              url: `https://api-football-v1.p.rapidapi.com/v3/players/seasons`,
              params: {
                player: '617'
              },
              headers: {
                'X-RapidAPI-Key': 'f0a33758c4mshab78617647e4dd4p1ab3a7jsn186794508508',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
              },
            });
    
            if (response.data && response.data.response) {
              setSeasons(response.data.response)
              setSelectedSeason(response.data.response[0]);
              setIsLoading(true);
              console.log(response.data.response)
            } else {
              console.error('Playerdata not found in API response');
            }
          } catch (error) {
            console.error('Error fetching player information:', error);
          }
        };
    
        fetchSeason();
      }, [PlayerId]);

      console.log(seasons)

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#00ffff'}}>
        <SafeAreaView>
            <Picker value={selectedSeason} onValueChange={(value) => setSelectedSeason(value)} items={seasons.map(season => ({ label: season, value: season}))} />
            <Text>Selected Season: {selectedSeason}</Text>
        </SafeAreaView>
    </View>
  )
}

export default SeasonPicker