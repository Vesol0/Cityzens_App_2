import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FIREBASE_AUTH } from '../../firebase'

/**
 * This screen has not been fully developed as of 22/05/2024
 * 
 * Features that need to be added: 
 * Profile Picture, 
 * Bio, 
 * @returns 
 * 
 * The current code will return the email address of the logged in user by importing FIREBASE_AUTH
 */

const MyProfile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{FIREBASE_AUTH.currentUser.email}</Text>
    </View>
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

export default MyProfile