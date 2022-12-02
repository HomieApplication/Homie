import React, { useEffect, useState } from "react";
import {
    Button,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/userProfile/ProfileHeader";
import Card from "../components/mainScreen/Card";
import { getAuth } from "firebase/auth";
import { auth } from "../components/firebase/config";

import * as ImagePicker from "expo-image-picker";

import { SERVER_URL } from "../components/firebase/config";

const fetchOffers = async (idToken) => {
    const offers = await fetch(`${SERVER_URL}/api/offers`, {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    })
        .then((res) => res.json())
        .catch((error) => console.log(error));

    const offersWithUser = await Promise.all(
        offers.map(async (offer) => {
            const userData = await fetch(
                `${SERVER_URL}/api/users/${offer.userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                }
            )
                .then((r) => r.json())
                .catch((error) => console.log(error));
            return { ...userData, ...offer };
        })
    ).catch((error) => console.log(error));

    return offersWithUser;
};

// const [image, setImage] = useState(null);

// const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: false,
//         aspect: [4, 4],
//         quality: 1,
//     });

//     console.log(result);

//     if (!result.cancelled){
//         setImage(result.assets[0].uri);
//     }
// }

const MainScreen = ({ navigation }) => {
    const userId = getAuth().currentUser.uid;
    const [userData, setUser] = useState({});
    const [idToken, setIdToken] = useState("");

    auth.currentUser.getIdToken().then((idToken) => {
        setIdToken(idToken);
    });

    useEffect(() => {
        fetch(`${SERVER_URL}/api/users/${userId}`, {
            headers: new Headers({
                Authorization: `Bearer ${idToken}`,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                // console.log(data);
            })
            .catch((error) =>
                console.log("Connection error: " + error.message)
            );
    }, []);

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchOffers(idToken).then((offers) => {
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
                    return (
                        <Card
                            key={i}
                            userFirstName={offer.firstName}
                            userLastName={offer.lastName}
                            description={offer.description}
                            year={offer.yearOfStudy}
                            localType={offer.localType}
                            localization={offer.localization}
                            imgUrl={require("../assets/defaultImg.png")}
                        />
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 0,
    },
    scroll: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        alignContent: "center",
        marginLeft: 15,
    },
});
