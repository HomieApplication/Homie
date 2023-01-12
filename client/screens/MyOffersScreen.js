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
        .get("/api/users/my-offers")
        .then((res) => res.data)
        .catch((error) => {
            console.log(error);
            displayAlertBox("Please, try again later", error.message);
        });

    return offers;
};

const MyOffers = () => {

    const userId = getAuth().currentUser.uid;
    const [userData, setUser] = useState({});
    const [myOffers, setmyOffers] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log(myOffers)

    useEffect(() => {
        fetchOffers()
            .then((offers) => {
                setmyOffers(offers);
                console.log(offers);
            })
            .catch((error) => {
                console.log(error);
                displayAlertBox("Please, try again later", error.message);
            });
    }, []);

    useEffect(() => {
        axios
            .get("/api/users")
            .then((res) => res.data)
            .then((data) => {
                setUser(data);
                console.log(data);
            })
            .then(() => setLoading(false))
            .catch((error) => {
                console.log("Connection error: " + error.message);
                displayAlertBox("Please, try again later", error.message);
                // logout();
            });
    }, []);

    return(
        <SafeAreaView style={styles.container}>
            {loading ? (
                <LoadingAnimation text="Loading"/>
            ) : (
                <SafeAreaView style={styles.containerMain}>
                    <View style={styles.header}> 
                        <Text style={styles.h1}>My Offers</Text>
                    </View>
                    <ScrollView style={styles.scroll}>
                    {/* {myOffers.map((offer, i) => {

                        const push = () => {
                            navigation.push("Offer", {offer: offer})
                        }

                        console.log(offer)
                        return (
                            <Card
                                key={i}
                                userFirstName={userData.firstName}
                                userLastName={userData.lastName}
                                description={offer.description}
                                year={userData.yearOfStudy}
                                title={offer.title}
                                imgUrl={userData.photoURL}
                                idOffer={offer.offerId}
                                onPress={push}
                            />
                        );
                        })} */}

                    </ScrollView>
                </SafeAreaView>
            )}
        </SafeAreaView>
    )
}
export default MyOffers

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