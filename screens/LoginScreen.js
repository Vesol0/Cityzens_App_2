import React, {useState} from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { User } from '../CurrentUser';
import { Ionicons} from "@expo/vector-icons";

/**
 * This screen is designed to handle the process of Login. 
 * 
 * The user can enter their name and password and the system will check if they have an account registered to the firebase app. 
 */

export default function LoginScreen() {
  const [text, onChangeText] = useState('');
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [loading, setLoading] = useState(false);
  const [iconName, setIconName] = useState('eye-outline')
  const auth = FIREBASE_AUTH;

  /**
   * Handle login is an async function which provides the functionality for signing in. 
   */
  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, password).then(()=> {
      Alert.alert("Sucessfully Signed in " + auth.currentUser.email)
      navigation.navigate('Tabs', 'Home'); // if signed in then navigate to home.
      
    })
    .catch((error) => { // catch error
      Alert.alert(error.message);
    })
  }

  /**
   * This function provides the functionality of turning off secure entry which allows the user to toogle the protected password via the eye icon. 
   */
  const handleIconPress = () => {
    if(secureEntry == true){
      setSecureEntry(false);
      setIconName('eye-off-outline');
    }
    else{
      setSecureEntry(true);
      setIconName('eye-outline');
    }
  }

  // display ui 
  return (
    <View className="flex-1 bg-white justify-center" >
      <ScrollView>
      <SafeAreaView>
        
        <View className="flex-row justify-center">
          <Image source={require('../assets/aguero.png')}
            style={{width: 200, height:200}}/>
        </View>
      </SafeAreaView>
        <Text style={styles.inputField}>Login</Text>
        <View className="">
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            placeholder='Email Address'
            value={email}
            keyboardType='email-address'
            />
          <View className="">
          <TouchableOpacity onPress={() => handleIconPress()} className=" absolute right-4 items-center">
            <Ionicons name={iconName} size={35} className=""/>
            </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={text => setPassowrd(text)}
            placeholder='Password'
            secureTextEntry={secureEntry}
            value={password}/>
            
            </View>
        

            <View className="flex-row" style={styles.inputField}>
                <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} >
                    <Text className="text-blue-500 font-bold ">Forgot?</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View className=" flex-row justify-center">
            <TouchableOpacity className="bg-blue-500" style={styles.btn} onPress={() => handleLogin()}>
                <Text className="text-center font-semibold">Login</Text>
            </TouchableOpacity> 
        </View>
        <View className="flex-row justify-center m-5">
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text className="pl-1 text-blue-500 font-bold">Sign Up!</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
      </View>

  )
}

// create styles

const styles = StyleSheet.create({
    btn: {
        alignSelf: 'center',
        paddingHorizontal: 100,
        paddingVertical: 25,
        borderRadius:50,

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
      marginRight: 45,
      padding: 10,
      
    }
})
