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
    Pressable,
    Vibration,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { getAuth } from "@firebase/auth";
import LoadingAnimation from "../components/LoadingAnimation";
import COLORS from "../components/assets";
import Card from "../components/mainScreen/Card";
import { displayAlertBox } from "../components/alert";
import { getStorage, ref, deleteObject } from "firebase/storage";

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

const MyOffers = ({ navigation }) => {
    const userId = getAuth().currentUser.uid;
    const [userData, setUser] = useState({});
    const [myOffers, setmyOffers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reloadSwitch, setReloadSwitch] = useState(false);

    // console.log(myOffers)

    useEffect(() => {
        fetchOffers()
            .then((offers) => {
                setmyOffers(offers);
                // console.log(offers);
            })

            .catch((error) => {
                console.log(error);
                displayAlertBox("Please, try again later", error.message);
            });
    }, [reloadSwitch]);

    useEffect(() => {
        axios
            .get("/api/users")
            .then((res) => res.data)
            .then((data) => {
                setUser(data);
                // console.log(data);
            })
            .then(() => setLoading(false))
            .catch((error) => {
                console.log("Connection error: " + error.message);
                displayAlertBox("Please, try again later", error.message);
                // logout();
            });
    }, []);

    function reload() {
        setLoading(true);
        setReloadSwitch(!reloadSwitch);
    }

    const deleteOffer = async (id) => {
        setLoading(true);

        const storage = getStorage();
        const offerToDelete = myOffers.find((offer) => offer.offerId === id); 
        const imagesUrls = offerToDelete.photoURLArray;
        const imagesNames = imagesUrls.map(
            (url) => url.split("%2F")[2].split("?")[0]
        );
        const imagesRefs = imagesNames.map((name) =>
            ref(storage, `images/${userId}/${name}`)
        );
        imagesRefs.forEach((ref) => {
            deleteObject(ref)
                .then(() => console.log("deleted"))
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        });

        await axios
            .delete(`/api/offers/${id}`)
            .then(() => displayAlertBox("Success!", "Offer deleted"))
            .then(() => {
                Vibration.vibrate();
                reload();
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                displayAlertBox("Please, try again later", error.message);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <LoadingAnimation text="Loading" />
            ) : (
                <SafeAreaView style={styles.containerMain}>
                    <View style={styles.header}>
                        <Pressable style={styles.goBack}>
                            <MaterialCommunityIcons
                                name="arrow-left"
                                color={COLORS.background}
                                size={35}
                                onPress={navigation.goBack}
                            />
                        </Pressable>
                        <Text style={styles.h1}>My Offers</Text>
                    </View>
                    <ScrollView style={styles.scroll}>
                        <View style={styles.scroll}>
                            {myOffers.map((offer, i) => {
                                const push = () => {
                                    navigation.push("Offer", { offer: offer });
                                };

                                // console.log(offer)
                                return (
                                    <Card
                                        key={i}
                                        userFirstName={userData.firstName}
                                        userLastName={userData.lastName}
                                        gender={userData.gender}
                                        university={offer.university}
                                        description={offer.description}
                                        year={userData.yearOfStudy}
                                        title={offer.title}
                                        imgUrl={userData.photoURL}
                                        idOffer={offer.offerId}
                                        onPress={push}
                                        isMine={true}
                                        deleteFunction={() =>
                                            deleteOffer(offer.offerId).catch(
                                                (error) => {
                                                    console.log(error);
                                                    setLoading(false);
                                                    displayAlertBox(
                                                        "Offer deletion failed",
                                                        error.message
                                                    );
                                                }
                                            )
                                        }
                                    />
                                );
                            })}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )}
        </SafeAreaView>
    );
};
export default MyOffers;

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
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    header: {
        width: "100%",
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

        marginLeft: 10,
    },
    goBack: {
        position: "absolute",
        left: 20,
        top: 10,
    },
});
