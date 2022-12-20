import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { async } from '@firebase/util';


const fetchOffer = async (id) => {
    const offer = await axios
        .get(`/api/offers/${id}`)
        .then((res) => res.data)
        .catch((error) => {
            console.log(error);
            displayAlertBox("Please, try again later", error.message);
        });
    
    console.log(offer)

    const offerWithUser = await Promise.all(
        offer.map(async (o) => {
            const userData = await axios
                .get(`/api/users/${o.userId}`)
                .then((res) => res.data)
                .catch((error) => {
                    console.log(error);
                });
            return { ...userData, ...offer}
        })
    ).catch((error) => {
        console.log(error);
    });

    // const user = await axios
    //     .get(`/api/users/${offer.userId}`)
    //     .then((res) => res.data)
    //     .catch((error) => {
    //         console.log(error);
    //         displayAlertBox("Please, try again later", error.message);
    //     })

    return offerWithUser;
}

const OfferScreen = ({route, navigation}) => {
    const {id} = route.params;
    const [offerData, setOfferData] = useState([]);

    useEffect((id) => {
        fetchOffer(id)
            .then((offer) => {
                setOfferData(offer)
            })
            .catch((error) => {
                console.log(error);
                displayAlertBox("Please, try again later", error.message);
            })
    })

    return (
        <View style={styles.container}>
            <Text>{id}</Text>
            <Text>{offerData.localType}</Text>
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