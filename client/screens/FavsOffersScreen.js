import {
    Text,
    View,
    StyleSheet,
    FlatList,
    SafeAreaView,
    StatusBar,
    Button,
    ScrollView,
    Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "@firebase/auth";
import LoadingAnimation from "../components/LoadingAnimation";
import COLORS from "../components/assets";
import Card from "../components/mainScreen/Card";
import { displayAlertBox } from "../components/alert";

const fetchOffers = async () => {
    const offers = await axios
        .get("/api/users/favs")
        .then((res) => res.data)
        .catch((error) => {
            console.log(error);
            displayAlertBox("Please, try again later", error.message);
        });

    const offersWithUser = await Promise.all(
        offers.map(async (offer) => {
            const userData = await axios
                .get(`/api/users/${offer.userId}`)
                .then((res) => res.data)
                .catch((error) => {
                    console.log(error);
                    displayAlertBox("Please, try again later", error.message);
                });
            return { ...userData, ...offer };
        })
    ).catch((error) => {
        console.log(error);
        displayAlertBox("Please, try again later", error.message);
    });

    return offersWithUser;
};

const FavsOffers = () => {

    const userId = getAuth().currentUser.uid;
    const [favOffers, setfavOffers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchOffers()
            .then((offers) => {
                setfavOffers(offers);
            })
            .then(() => setLoading(false))
            .catch((error) => {
                console.log(error);
                displayAlertBox("Please, try again later", error.message);
            });
    }, []);


    return(
        <SafeAreaView style={styles.container}>
            {loading ? (
                <LoadingAnimation text="Loading"/>
            ) : (
                <SafeAreaView style={styles.containerMain}>
                    <View style={styles.header}> 
                        <Text style={styles.h1}>My Favourite Offers</Text>
                    </View>
                    <ScrollView style={styles.scroll}>
                    {favOffers.map((offer, i) => {

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
                                localType={offer.localType}
                                //localization={offer.localization}
                                imgUrl={offer.photoURL}
                                idOffer={offer.offerId}
                                onPress={push}
                            />
                        );
                        })}

                    </ScrollView>
                </SafeAreaView>
            )}
        </SafeAreaView>
    )
}
export default FavsOffers

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.background,
    },
    containerMain: {
        marginTop: 50,
        flex: 1,
        width: '100%',
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    header: {
        width: '100%',
        flex: 0.15,
        backgroundColor: COLORS.primary1,
        alignItems: "center",
        justifyContent: "center",

    },
    h1: {
        color: COLORS.textProfile,
        fontSize: 24,
    },
    scroll: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        alignContent: "center",

        marginLeft: Dimensions.get('window').width*0.1,
    },
})