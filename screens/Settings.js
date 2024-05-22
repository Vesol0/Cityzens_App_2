import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Header } from 'react-native/Libraries/NewAppScreen';
import { FIREBASE_AUTH } from '../firebase';
import { signOut } from 'firebase/auth';

/**
 * Create Settings screens
 * 
 * This screen has little functionality apart from logging a user out. 
 * 
 * 
 * @returns 
 */
export default function Settings() {
    const auth = FIREBASE_AUTH;
    const navigator = useNavigation();
  return (
    <View style={styles.container} className="bg-slate-200">
        <SafeAreaView>
            <View>
                <Text style={styles.HeaderText}>Settings</Text>
            </View>

            <TouchableOpacity onPress={() =>( // when the user presses the component, this function will be called.
                Alert.alert(
                    'Log Out', 
                    'Confirm log out', // confirmation of log out. 
                    [ {
                        text: 'Yes', onPress: () => ( // if yes, log out user.
                            signOut(auth).then(()=> {
                                Alert.alert("Sucessfully Signed out");
                                navigator.navigate("Login");
                            }
                            
                            
                        ).catch((error) => { // exception handling
                            alert(error + "There has been an error logging you out. ")
                        },

                    )
                        )
                    },
                    {
                        text: 'No', onPress: () => ( // if no display pop up to let user know they are still logged in. 
                            Alert.alert("You are still logged in as " + auth.currentUser.email)
                        )

                    }
                ]
                )
            )}>
            <View className="flex-row mt-1" style={styles.Section}>
                <Text style={styles.SectionHeaderText}>Log Out</Text>
            </View>
            </TouchableOpacity>
        </SafeAreaView>
    </View>
  )
}

//create styles.

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },

    HeaderText:{
        fontSize: 35,
        fontWeight: '500'
    },
    Section:{
        backgroundColor: '#FFFFFF'
    },
    SectionHeaderText:{
        fontSize: 25,
    },
    SectionHeader:{
        
    },
    SectionBody:{

    },
    rowMapper:{

    },
})
