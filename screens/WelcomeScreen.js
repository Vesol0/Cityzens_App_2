import { StackActions } from '@react-navigation/native';
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


/**
 * Welcome screen when opening the application. 
 * 
 * @returns 
 */

export default function WelcomeScreen() {
    const navigation = useNavigation() // create navigation

    //create ui 
  return (
        
        <View style={styles.container} className="space-y-10">
            <Image source={require('../assets/cityzen-logo.png')}
            style={{width: 85, height:85}}/>
                <Text style={styles.inputField}>Welcome Cityzen!</Text>
                <View className="flex-row">
                    <TouchableOpacity className="bg-blue-500" style={styles.btn} onPress={() => navigation.navigate("Login")}>
                        <Text className="text-white -tracking-[-2]">Login with Username</Text>
                    </TouchableOpacity>
                    
                </View>
                <View className="flex-row space-x-1">
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity>
                        <Text className="text-blue-500 font-bold " onPress={() => navigation.navigate("Register")}>Sign up?</Text>
                    </TouchableOpacity>
                </View>
                
        </View>
    

  )
}

// create styles
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
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
      borderBottomWidth: 2,
      fontSize: 15,
      marginLeft: 15,
      marginRight: 15,
      padding: 10
    }
})
