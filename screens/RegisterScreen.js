import React, { useState, useRef} from 'react'
import { View, Text, TextInput, SafeAreaView, Image, StyleSheet, style, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { FIREBASE_AUTH } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

/**
 * This screen provides the user the functionality of Registering an account
 * 
 * The screen displays input fields where the user can enter their email and password they would like to use to register an account. 
 * @returns 
 */
export default function RegisterScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassowrd] = useState('');
    const [FirstName, setFirstName] = useState('')
    const [surname, setsurname] = useState('')
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const DismissKeyboard = ({ children }) => ( 
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {children}
        </TouchableWithoutFeedback>
      )
      const auth = FIREBASE_AUTH; // create Firebase object. 
      /**
       * Async function which trys to register an account by using createUserWithEmailAndPassword built in function that firebase provides. 
       * 
       * No SQL has been used. 
       */
      const signUp = async () => {
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password); // create user. 
            console.log(response);
            alert('Sucessfully registered')
            navigation.navigate('Login') // navigate to login screen once user is created.
          }
          catch (error) { // exception handling.
            console.log(error);
            alert('Sign up failed: ' + error.message);
          }
        }
      // display ui 
  return (

    /**
     * Using a keyboard avoiding view to avoid elements getting blocked when the keyboard is activated. 
     */
    <KeyboardAvoidingView style={styles.container} className="bg-white" behavior='position' >
        <SafeAreaView className="items-center">
            <Image source={require('../assets/aguero.png')}
            style={{width: 200, height:200}}/>
        </SafeAreaView>
        <View className="m-5 space-y-3">
            <Text style={styles.inputField} className="text-left">Register</Text>
            <TextInput nativeID='EnterFirstName'
            style={styles.input}
            placeholder='First Name'
            
            />
            <TextInput nativeID='EnterSurname'
            style={styles.input}
            placeholder='Surname'
            
            />
            <TextInput nativeID='EnterEmailAddress'
            style={styles.input}
            placeholder='Email Address'
            onChangeText={text => setEmail(text)}
            value={email}
            
            
            />
            <TextInput nativeID='EnterPassword'
            style={styles.input}
            placeholder='Password'
            onChangeText={text => setPassowrd(text)}
            value={password}
            secureTextEntry={true}
            
            />
            <TouchableOpacity className="bg-blue-500" style={styles.btn} onPress={signUp}>
                <Text className="text-center font-semibold">Register</Text>
            </TouchableOpacity> 

        </View>
        <View className="flex-row justify-center space-x-2">
                <Text>Already have an account?</Text>
            <TouchableOpacity className="" onPress={() => navigation.navigate("Login")}>
                <Text className="text-center font-semibold">Login</Text>
            </TouchableOpacity> 
            </View>
    </KeyboardAvoidingView>
    
  )
}


// create Styles.

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center'
    },
    inputField: {
        fontSize: 35,
        fontWeight: "300",
        padding: 15
  
      },
      input: {
        borderBottomWidth: 2,
        fontSize: 15,
        marginLeft: 15,
        marginRight: 15,
        padding: 10
      },
      btn: {
        alignSelf: 'center',
        paddingHorizontal: 100,
        paddingVertical: 25,
        borderRadius:50,
      },
    
});