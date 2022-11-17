import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import MainScreen from './screens/MainScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import UserProfile from './screens/UserProfile';
import AddOfferScreen from './screens/AddOfferScreen';

// App.js jest jak main - tutaj ma być mało kodu
// głównie nawigacja - react-navigation

// w ./screens - całe strony - profil / logowanie / strona główna
// w ./components/[nazwa strony] - komponenty które budują daną strone np.: opis / karta/ nagłówek itd

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const isLoggedIn = false;  // tu jest takie coś co trzeba będzie zroboić
// bt ustawiało na true jesli udało się zalogować
//jakoś gdzies indziej to trezba ogarnąć ale idk how 

function Main() {
  return(
    <Tab.Navigator 
    initialRouteName='MainScreen'
    screenOptions={{
      tabBarActiveTintColor: '#679436ff',
      headerShown: false
    }}>
      <Tab.Screen 
      name='Home' 
      component={MainScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={35} />
        ),
        tabBarShowLabel: false 
        }}/>
      <Tab.Screen 
      name='AddOffer' 
      component={AddOfferScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="plus-box" color={color} size={50}/>
        ),
        tabBarShowLabel: false 
        }}/>
      <Tab.Screen 
      name='Profile' 
      component={UserProfile}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={35} />
        ),
        tabBarShowLabel: false 
        }}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>

        { !isLoggedIn ? (
          <Stack.Group>
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="AddOffer" component={AddOfferScreen}/>
            <Stack.Screen name="Profile" component={UserProfile}/>
        </Stack.Group>
        )}
      </Stack.Navigator>

    </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
