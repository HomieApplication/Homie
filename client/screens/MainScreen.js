import React, { useEffect, useState } from "react";
import {
    Button,
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../components/userProfile/ProfileHeader";
import Card from "../components/mainScreen/Card";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import { displayAlertBox } from "../components/alert";
import { logout } from "../components/auth";
import LoadingAnimation from "../components/LoadingAnimation";
import COLORS from "../components/assets";

const fetchOffers = async () => {
    const offers = await axios
        .get("/api/offers")
        .then((res) => res.data)
        .catch((error) => {
            console.log(error);
            displayAlertBox("Please, try again later", error.message);
            // logout();
        });

    const offersWithUser = await Promise.all(
        offers.map(async (offer) => {
            const userData = await axios
                .get(`/api/users/${offer.userId}`)
                .then((res) => res.data)
                .catch((error) => {
                    console.log(error);
                    displayAlertBox("Please, try again later", error.message);
                    // logout();
                });
            return { ...userData, ...offer };
        })
    ).catch((error) => {
        console.log(error);
        displayAlertBox("Please, try again later", error.message);
        // logout();
    });

    return offersWithUser;
};


const MainScreen = ({ navigation }) => {
    const [userData, setUser] = useState({});
    const [offersData, setOffersData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/api/users")
            .then((res) => res.data)
            .then((data) => {
                setUser(data);
                // console.log(data);
            })
            .catch((error) => {
                console.log("Connection error: " + error.message);
                displayAlertBox("Please, try again later", error.message);
                // logout();
            });
    }, []);

    useEffect(() => {
        fetchOffers()
            .then((offers) => {
                setOffersData(offers);
            })
            .then(() => setLoading(false))
            .catch((error) => {
                console.log(error);
                displayAlertBox("Please, try again later", error.message);
                // logout();
            });
    }, []);

    return (
        <SafeAreaView style={styles.containerMain}>
            {loading ? (
                <LoadingAnimation text="Loading please wait" />
            ) : (
            <SafeAreaView style={styles.container}>
                <ProfileHeader
                    user={userData}
                    onPress={()=>{navigation.push("FavsOffers")}}
                />

                <ScrollView style={styles.scroll}>
                    {offersData.map((offer, i) => {

                        const push = () => {
                            console.log(offer.offerId)
                            navigation.push("Offer", {offer: offer})
                        }

                        console.log(offer)
                        return (
                            <Card
                                key={i}
                                userFirstName={offer.firstName}
                                userLastName={offer.lastName}
                                description={offer.description}
                                year={offer.yearOfStudy}
                                title={offer.title}
                                localization={offer.localization.map}
                                imgUrl={require("../assets/defaultImg.png")}
                                idOffer={offer.offerId}
                                onPress={push}
                            />
                        );
                    })}
                </ScrollView>
            </SafeAreaView>
            )}
        </SafeAreaView>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    containerMain: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scroll: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        alignContent: "center",

        marginLeft: Dimensions.get('window').width*0.1,
    },
});
