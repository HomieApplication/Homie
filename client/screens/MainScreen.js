import React from 'react'; 
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {  } from "firebase/auth";



const MainScreen = ({ navigation }) => {
    return(
        <SafeAreaView style={styles.container}>
            <Text></Text>
        </SafeAreaView>
    )
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });