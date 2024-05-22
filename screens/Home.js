import React, { useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, style, ScrollView } from 'react-native'
import LastMatch from '../components/LastMatch'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Leagues from './Leagues';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TeamsList from './TeamsList';

/**
 * This screen is the home screen when the user has signed in! 
 * This screen will have a drawer navigator which will allow the user to navigate to leagues or teams. 
 * @returns 
 */


/**
 * function home returns the ui 
 * @returns 
 */
export default function Home() {
  const Drawer = createDrawerNavigator();
  const navgiator = useNavigation();

  return(
    <NavigationContainer independent={true}>
      <Drawer.Navigator>
        <Drawer.Screen name='Leagues' component={() => (<Leagues Navigator={navgiator}/>)}/>
        <Drawer.Screen name='Teams' component={() => (<TeamsList Navigator={navgiator}/>)}/>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

// create styles

const styles = StyleSheet.create({
  container: {
      flex: 1, 
      alignItems:'center'
      
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
    fontSize: 20
  },
  table: {

  },
  logo: {
    height: 30,
    width: 30,
  },
  match :{
    borderRadius: '50',
    
    
  },


})