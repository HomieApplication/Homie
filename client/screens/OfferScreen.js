import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { async } from '@firebase/util';


const fetchUser = async (o) => {
    const userData = await axios
        .get(`/api/users/${o.userId}`)
        .then((res) => res.data)
        .catch((error) => {
            console.log(error);
        });

    console.log(userData)
    return userData
}

const OfferScreen = ({route, navigation}) => {

    const [offerData, setOfferData] = useState([]);
    const [userData, setUserData] = useState([]);
    const {offer} = route.params;  

    useEffect(()=>{
        setOfferData(offer)
    },[])

    
    useEffect(() => {
        fetchUser(offer)
            .then((user) => {
                setUserData(user)
            })
            .catch((error) => {
                console.log(error);
                displayAlertBox("Please, try again later", error.message);
            })
            console.log("fetchUser")
    }, [])

    return (
        <View style={styles.container}>
            <Text>{offerData.localType}</Text>
            <Text>{userData.firstName}</Text>
        </View>
    )
}

export default OfferScreen

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '85%',
        marginBottom:20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'a8a8a8',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    
        elevation: 2,
    },
    // text:{
    //   fontSize: 20,
    //   fontWeight: 'bold',
    //   letterSpacing: 0.25,
    //   color: 'grey',
    // }
})