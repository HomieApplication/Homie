import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/userProfile/ProfileHeader";
import Card from "../components/mainScreen/Card";
import { getAuth } from "firebase/auth";

import { SERVER_URL } from "../components/firebase/config";

const fetchOffers = async () => {
    const offers = await fetch(`${SERVER_URL}/api/offers`).then((res) =>
        res.json()
    );

    const offersWithUser = await Promise.all(
        offers.map(async (offer) => {
            const userData = await fetch(
                `${SERVER_URL}/api/users/${offer.userId}`
            ).then((r) => r.json());
            return { ...userData, ...offer };
        })
    ).catch((error) => console.log(error));

    return offersWithUser;
};

const MainScreen = ({ navigation }) => {
    const userId = getAuth().currentUser.uid;
    const [userData, setUser] = useState({});
    useEffect(() => {
        fetch(`${SERVER_URL}/api/users/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                console.log(data);
            })
            .catch((error) =>
                console.log("Connection error: " + error.message)
            );
    }, []);

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchOffers().then((offers) => {
            setData(offers);
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ProfileHeader
                userFirstName={userData.firstName}
                year={userData.yearOfStudy}
            />
            <ScrollView style={styles.scroll}>
            {data.map((offer, i) => {
                return <Card key={i} userFirstName={offer.firstName} userLastName={offer.lastName} description={offer.description} year={offer.yearOfStudy} localType={offer.localType} localization={offer.localization} />;
            })}
            </ScrollView>
        </SafeAreaView>
    );
};

// //userFirstName={offer.firstName} userSecondName={offer.lastName}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        alignItems: "center",
        justifyContent:'space-between',
    },
    scroll: {
        flex: 1,
        width: '100%',
        alignContent: 'center',
    }
});
