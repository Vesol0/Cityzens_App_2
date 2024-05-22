import React, { useEffect, useState } from 'react'
import { Alert, Image, SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native'
import axios from 'axios';
import Loading from '../components/Loading';
import HomeStats from './FixtureStats/HomeStats';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AwayStats from './FixtureStats/AwayStats';
import MatchLineups from './FixtureStats/MatchLineups';

const ViewFixture = ({ route }) => {
    const { FixtureData } = route.params;
    const [fixture, setFixture] = useState(null);
    const [fixtureStats, setFixtureStats] = useState(null);
    const [homeFixture, setHomeFixture] = useState([]);
    const [awayFixture, setAwayFixture] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [FixtureID, setFixtureID] = useState('')

    const TopTabNav = createMaterialTopTabNavigator();

    useEffect(() => {
      const getFixture = () => {
        try{
            setFixture(FixtureData);
            console.log(FixtureData)
        }catch(error){
            Alert.alert('Error', error);
        }
      }
    
      getFixture();
    }, [FixtureData])

    useEffect(() => {
        const fetchFixtureStats = async () => {
            try {
                const response = await axios.request({
                    method: 'GET',
                    url: `https://api-football-v1.p.rapidapi.com/v3/fixtures/events`,
                    params: {
                        fixture: FixtureData.fixture.id,
                    },
                    headers: {
                        'X-RapidAPI-Key': 'f0a33758c4mshab78617647e4dd4p1ab3a7jsn186794508508',
                        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
                    },
                });

                if (response.data && response.data.response) {
                    
                    const stats = response.data.response;
                    setFixtureID(FixtureData.fixture.id);
                    setIsLoading(false);
                    

                    const homeFixtureStats = [];
                    const awayFixtureStats = [];

                    stats.forEach((event) => {
                        if (event.team.id === fixture.teams.home.id && event.type === "Goal") {
                            homeFixtureStats.push(event);
                        } else if (event.team.id === fixture.teams.away.id && event.type === "Goal") {
                            awayFixtureStats.push(event);
                        }
                    });

                    setHomeFixture(homeFixtureStats);
                    setAwayFixture(awayFixtureStats);
                    
                    console.log('homeFixture', homeFixtureStats);
                } else {
                    console.error('Fixture Stats cannot be found');
                }
            } catch (error) {
                console.error('Error fetching Fixture Stats', error);
            }
        };

        if (fixture) { // check if fixture has been called.
            fetchFixtureStats();
        }
    }, [FixtureData.fixture.id, fixture]);

    if(isLoading){
        return(
            <Loading/>
        )
    }

    // function check if Own goal 

    const checkIfOwnGoal = (detail) => {
        // get detail

        if(detail === "Own Goal") { // check if detail is equal to own goal
            return '(OG)'; // if true then return '(OG)
        }
        return ''; // else return empty string
    }
    
  return (
    <NavigationContainer independent={true}>
    <SafeAreaView style={styles.container}>
     { fixture &&   
    <View style={{alignContent: 'space-evenly'}}>
        <View style={{alignItems: 'center'}}>
            <Text style={styles.headerTxt}>{(() => {
                //https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object  - code snippet for creating a date 
                const date = new Date(fixture.fixture.date);
                const day = date.getDate();
                const year = date.getFullYear();
                const month = date.toLocaleDateString('default', {month: 'long'})
                return `${day} ${month} ${year}`;
            })()}</Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 5}}>
            <Image source={{uri: fixture.league.logo}} style={{height: 40, width: 40}}/>
        </View>
        <View style={styles.row}>
            <View style={styles.col}>
            <Image source={{uri: fixture.teams.home.logo}} style={styles.clubLogo}/>
            <Text style={styles.headerTxt}>{fixture.teams.home.name}</Text>

            <FlatList scrollEnabled={false}
        data={homeFixture}
        keyExtractor={(item) => item.time.elapsed.toString()}
        renderItem={({ item }) => (
            <View style={{flexDirection: 'row'}}>
                <Text style={{textAlign: 'center', fontSize: 15, paddingHorizontal: 5 }}>{item.time.elapsed}'</Text>
                <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 600}}>{checkIfOwnGoal(item.detail)}</Text>
                <Text style={{textAlign: 'center', fontSize: 15}}>{item.player.name}</Text>
            </View>
        )}
      />
            </View>
            <Text style={styles.headerTxt}>{fixture.goals.home}</Text>
            <Text style={styles.headerTxt}>-</Text>
            <Text style={styles.headerTxt}>{fixture.goals.away}</Text>
            <View style={styles.col}>
            <Image source={{uri: fixture.teams.away.logo}} style={styles.clubLogo}/>
            <Text style={styles.headerTxt}>{fixture.teams.away.name}</Text>

            <FlatList scrollEnabled={false}
        data={awayFixture}
        keyExtractor={(item) => item.time.elapsed.toString()}
        renderItem={({ item }) => (
            <View style={{flexDirection: 'row'}}>
                <Text style={{textAlign: 'center', fontSize: 15, paddingHorizontal: 5 }}>{item.time.elapsed}'</Text>
                <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 600}}>{checkIfOwnGoal(item.detail)}</Text>
                <Text style={{textAlign: 'center', fontSize: 15}}>{item.player.name}</Text>
            </View>
        )}
      />
            </View>
        </View> 
    </View>
    }
    
   

    
    </SafeAreaView>
    <TopTabNav.Navigator>
        <TopTabNav.Screen name='Home Stats' component={() => (<HomeStats fixtureID={FixtureData.fixture.id} TeamID={fixture.teams.home.id}/>)}/>
        <TopTabNav.Screen name='Away Stats' component={() => (<AwayStats fixtureID={FixtureData.fixture.id} TeamID={fixture.teams.away.id}/>)}/>
        <TopTabNav.Screen name='Lineup' component={() => (<MatchLineups FixtureID={FixtureData.fixture.id} TeamID={fixture.teams.home.id}/>)}/>
    </TopTabNav.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: 'center',
        marginTop: 15,
    },
    row: {
        flexDirection: 'row',
        gap: 10, 
        justifyContent: 'space-between',
        padding: 10,
    },
    col: {
        flexDirection: 'column',
        alignItems: 'center'
        
    },
    headerTxt: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 15,
        textAlign: 'center'
    },
    clubLogo:{
        height: 50,
        width: 50,
    }
})

export default ViewFixture