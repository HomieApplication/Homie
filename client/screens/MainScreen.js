import React, { useEffect, useState } from 'react'; 
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileHeader from '../components/userProfile/ProfileHeader'
import Card from '../components/mainScreen/Card';


const fetchOffers = async () => {
    const offers = await fetch("http://192.168.123.89:3000/api/offers")
        .then(res => res.json())
    
    const offersWithUser = await Promise.all(
        offers.map( async offer => {
            const userData = fetch(`http://192.168.123.89:3000/api/users/${offer.userId}`)
                .then(r => r.json())
            return {...userData, ...offer}
        })
            
    );

    return offersWithUser;
}



const MainScreen = ({ navigation }) => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetchOffers().then( (offers) => {
            setData(offers);
        })

    }, []);

    const renderItem = ({item}) => (
        <Card userName={item.}/>
    );
    
    return(
        <SafeAreaView style={styles.container}>

            <ProfileHeader userName="Kinga" year='2'/>
            <Card userName="Kinga"  userSecondName="Wrona" year="2" description="Tutaj jest super fajny opis" localization="Kraków" localType="dormitory"/>
            <FlatList 
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      alignItems: 'center',
    },
  });