import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'


const OfferScreen = ({route, navigation}) => {
    const {id} = route.params
    
    return (
        <View style={styles.container}>
            <Text>{id}</Text>
        </View>
    )
}

export default OfferScreen

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
    // text:{
    //   fontSize: 20,
    //   fontWeight: 'bold',
    //   letterSpacing: 0.25,
    //   color: 'grey',
    // }
})