import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const AddOfferScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Add offer here!</Text>
    </SafeAreaView>
  )
}

export default AddOfferScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})