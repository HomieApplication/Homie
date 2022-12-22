import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Tab = (props) => {
    const {title} = props
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

export default Tab

const styles = StyleSheet.create({
    container:{
        width: '90%',
        height: 80, //Dimensions.get('window').height/15,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'a8a8a8',
    },
    text:{
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'grey',
    }
})