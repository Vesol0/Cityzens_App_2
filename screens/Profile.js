import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FIREBASE_AUTH } from '../firebase'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import EditProfile from './ProfileScreens.js/EditProfile'
import MyProfile from './ProfileScreens.js/MyProfile'

/**
 * This screen Profile allows the User to visit their Profile via a drawer navigator. 
 * 
 * This screen only contains the navigator. 
 * @returns 
 */

const Profile = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const Drawer = createDrawerNavigator(); // create drawer navigator  https://reactnavigation.org/docs/stack-navigator/
  return ( 
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName='Profile'>
        <Drawer.Screen name='Profile' component={MyProfile}/>
        <Drawer.Screen name='Edit Profile' component={EditProfile}/>
      </Drawer.Navigator>
    
   
    </NavigationContainer>
  )
  
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    alignSelf: 'center',
    marginTop: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 500,
  },
  btnText: {
    fontWeight: '600'
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#3d9eff',
    borderRadius: 25,
    padding: 10,
    margin: 10
  }
})

export default Profile