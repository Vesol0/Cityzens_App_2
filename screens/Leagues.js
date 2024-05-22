import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Text, } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import PremierLeagueTable from './Standings'
import Picker from 'react-native-picker-select';

/**
 * Screen leagues allows the user to select a league and display the standings for that league
 * *******
 * The application only has support for five leagues which are La Liga, Premier League, Ligue 1, Serie A, Bundesliga (THE TOP 5 IN EUROPE)
 * 
 * this is due to limit excessive calls to the api. Due to the way the api is designed their is a limit of calls you can make per day. 
 * @param {*} param0 
 * @returns 
 */


/**
 * this passes through the navigaton route so you can navigate between different routes. 
 */
const Leagues = ({Navigator}) => {
  const TopTabNav = createMaterialTopTabNavigator();
  const [selectedLeague, setSelectedLeague] = useState('39');
  const navigator = Navigator;
  const LoadScreen = ({ selectedLeague }) => {

    // useEffect
    useEffect(() => {
      const getScreen = () => {
        console.log('Screen updated for league:', selectedLeague);

      };
  
      getScreen();
    }, [selectedLeague])};

    /**
     * Design UI 
     */
  return (
    <NavigationContainer independent={true}>
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
        <Text style={styles.text}>Selected League: {selectedLeague}</Text>
      </View>
      <TopTabNav.Navigator>
        <TopTabNav.Screen name='standings' component={() => (<PremierLeagueTable LeagueID={selectedLeague} navigation={navigator}/>)}/>
      </TopTabNav.Navigator>
    </NavigationContainer>
  )
}

// create Styles
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
});

export default Leagues