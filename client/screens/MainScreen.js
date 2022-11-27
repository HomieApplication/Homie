import React, { useEffect, useState } from 'react'; 
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileHeader from '../components/userProfile/ProfileHeader'
import Card from '../components/mainScreen/Card';
import { getAuth } from 'firebase/auth';

import { SERVER_URL } from '../components/firebase/config';


const fetchOffers = async () => {
    const offers = await fetch(`${SERVER_URL}/api/offers`)
        .then(res => res.json())
    
    const offersWithUser = await Promise.all(
        offers.map( async offer => {
            const userData = fetch(`${SERVER_URL}/api/users/${offer.userId}`)
                .then(r => r.json())
            return {...userData, ...offer}
        })
            
    );

    return offersWithUser;
}



const MainScreen = ({ navigation }) => {
    
    userId = getAuth().currentUser.uid;
    const [userData, setUser] = useState({});
    useEffect(() => {
        fetch(`${SERVER_URL}/api/users/${userId}`).then(res => res.json()).then(data => setUser(data));
    }, [])

    const [data, setData] = useState([])

    useEffect(() => {

        fetchOffers().then( (offers) => {
            setData(offers);
        })

    }, []);

    
    return(
        <SafeAreaView style={styles.container}>

            <ProfileHeader userFirstName={userData.firstName} year={userData.yearOfStudy}/> 
            {data.map((offer, i) => {
                return(
                    <Card key={i} userFirstName={offer.firstName}/>
                )
            })}
        </SafeAreaView>
    )
}

// //userFirstName={offer.firstName} userSecondName={offer.lastName} 

export default MainScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      alignItems: 'center',
    },
  });