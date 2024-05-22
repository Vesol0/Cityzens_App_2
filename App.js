
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPassword from './screens/ForgotPassword';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/Home';
import NextMatch from './components/NextMatch';
import Fixture from './screens/Fixture';
import 'react-native-gesture-handler';
import Team from './screens/Team';
import { Ionicons } from "@expo/vector-icons";
import Settings from './screens/Settings';
import Newsfeed from './screens/Newsfeed';

import { useState, useEffect } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import Profile from './screens/Profile';
import Player from './screens/Player';
import ViewFixture from './screens/ViewFixture';

/**
 * This is the Application file
 * 
 * This stores all the navigators to allow navigation.
 * 
 * 
 */

const Stack = createNativeStackNavigator(); // create navigators
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// create custom header
const CustomHeader = ({ navigation}) => (
  <SafeAreaView style={styles.header}>

    <Image source={require('./assets/cityzen-logo.png')}
            style={{width: 50, height:50, alignItems: 'center'}}/>
            
  </SafeAreaView>
);

// create tab scr3eens
export function TabScreens() {
  return (

    // create custom tabs with icons
    <Tab.Navigator initialRouteName="Home" screenOptions={({route, navigation}) =>({
      header: () => <CustomHeader navigation={navigation} title="Profile"/>,
      tabBarIcon: ({color, focused, size})=>{

        // add icons.
        let iconName;
        if(route.name === "Home"){
          iconName = focused ? "home" : "home-outline";
        }
        else if(route.name === "Settings"){
          iconName= focused ? "settings" : "settings-outline"
        }
        else if(route.name == "Newsfeed"){
          iconName= focused? "people-circle" : "people-circle-outline" 
        }
        else if(route.name == "Profile"){
          iconName= focused? "person" : "person-outline" 
        }

        return <Ionicons name={iconName} size={size} color={color}/> 

  

    }, 
    
    })}>
      <Tab.Screen name="Team" component={Team} options={{tabBarButton: () => (null)}}/>
      <Tab.Screen name="Player" component={Player} options={{tabBarButton: () => (null)}}/>
      <Tab.Screen name="ViewFixture" component={ViewFixture} options={{tabBarButton: () => (null)}}/>
      
      <Tab.Screen name="Newsfeed" component={Newsfeed}/>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} options={{HeaderShown: false}}/>
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}




// Screen Options
const screenOptions = { 
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: true,
  tabBarStyle: {
    position: "Absolute", 
    bottom: 0, 
    right: 0,
    left: 0,
    elevation: 0,
    height: 70,

  }
}

/**
 * Main function app which contains the stack naviagtion. 
 * @returns 
 */

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="NextMatch" component={NextMatch}/>
        <Stack.Screen 
          name="Tabs" 
          component={TabScreens} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}


// create styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 0,
    borderBottomColor: '#ccc',
    justifyContent: 'center'
  },
});
