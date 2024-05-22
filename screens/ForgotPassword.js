import React, {useState} from 'react'
import { StyleSheet, View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Alert} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebase';

/**
 * Screen Forgot Password provides the functionality for sending an email to reset the users password using firebase
 * firebase itself has their own built in methods to automatically handle he password reset without adding additional code. 
 * @returns 
 */


export default function ForgotPassword() {

const [email, setEmail] = useState('');
const auth = FIREBASE_AUTH;
const [error, setError] = useState('')

/**
 * function reset password
 * 
 */
const resetPassword = () => {
  /**
   * create ew regex object
   */
  const re = new RegExp('[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}')
  if(email.length == 0){ // check if email is empty
    setError("This field cannot be empty!")
  }
  else{
    if(re.test(email)){ // else test the provided email against the regex
      
      sendPasswordResetEmail(auth, email).then(() => { //firebase built in reset email function. if the user has an account linked to their email a password reset link will be sent. 
        Alert.alert('Check your emails'); // display popup to alert user to check their emails
      })
      .catch((error) => { // handle exception
        //Alert.alert('Error', error.message);
        setError(error.message);
      })
    }
    else{
      setError("Invalid Email"); // set error
    }

  }
  
}

 
  const navigation = useNavigation() // create navigation object to navigate between the stacks https://reactnavigation.org/docs/stack-navigator/
  return (
    /**
     * Display UI 
     */
    <KeyboardAvoidingView style={styles.container} className="space-y-16" behavior='height'  > 
      <TouchableOpacity className="ml-5" onPress={() => navigation.goBack()}>
        <AntDesign name="leftcircleo" size={40} color="black" />
      </TouchableOpacity>
        <SafeAreaView className="items-center">
        <Image source={require('../assets/cityzen-logo.png')}
            style={{width: 85, height:85}}/>
        </SafeAreaView>
        <View className="items-center space-y-5 px-6">
            <Text className="font-semibold text-[25px]">Forgot Your Password?</Text>
            <Text className="text-center text-[15]">Enter your email address and we will send you instructions to reset your password.</Text>
        </View>
        <View>
        <TextInput
            style={styles.input}
            placeholder='Email Address'
            keyboardType='email-address'
            onChangeText={text => setEmail(text)}
            value={email}
            
        />

        <Text className="text-red-600 m-3">{error}</Text>
        </View>
        <TouchableOpacity style={styles.btn} className="bg-blue-500 my-5" onPress={() => resetPassword()}>
            <Text>Forgot Password</Text>
        </TouchableOpacity>


        
        </KeyboardAvoidingView>
    
  )
}


// create styles 
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        
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
    }
})

