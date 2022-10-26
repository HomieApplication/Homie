import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import MainScreen from './screens/MainScreen';
import SignInScreen from './screens/SignInScreen';

// App.js jest jak main - tutaj ma być mało kodu
// głównie nawigacja - react-navigation

// w ./screens - całe strony - profil / logowanie / strona główna
// w ./components/[nazwa strony] - komponenty które budują daną strone np.: opis / karta/ nagłówek itd

export default function App() {
  return (
    <View style={styles.container}>
      <SignInScreen />
      <StatusBar style="auto" />
    </View>
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
