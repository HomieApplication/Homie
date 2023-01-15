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
import { MultipleSelectList } from "react-native-dropdown-select-list";

import { displayAlertBox } from "../components/alert";
import { logout } from "../components/auth";
import LoadingAnimation from "../components/LoadingAnimation";
import COLORS from "../components/assets";
import { auth } from "../components/firebase/config";
import SignInBtn from "../components/signIn/SignInBtn";

const MainScreen = ({ navigation }) => {
    
    //userData contains data about log in user
    //offersData contains data about every offer and its creator
    //loading is true when all data have been fetched
    //selectedFilters contains array of selected filters
    //reloadSwitch is a flag 

    const [userData, setUser] = useState({});
    const [offersData, setOffersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFilters, setSelectedFilters] = React.useState([]);
    const [reloadSwitch, setReloadSwitch] = useState(false);

    const filters = [
        { key: "1", value: "male" },
        { key: "2", value: "female" },
        { key: "3", value: "1st year" },
        { key: "4", value: "2nd year" },
        { key: "5", value: "3rd year" },
        { key: "6", value: "4th year" },
        { key: "7", value: "5th year" },
        { key: "8", value: ">5th year" },
        { key: "9", value: "Sport" },
        { key: "10", value: "Computers" },
        { key: "11", value: "Cooking" },
        { key: "12", value: "Literature" },
        { key: "13", value: "Journey" },
        { key: "14", value: "Music" },
        { key: "15", value: "Video Games" },
        // Można by dodać jeszcze filtry na wiek i uniwersytet, ale trzeba  by to uporządkować jakoś
    ];

    const fetchOffers = async () => {

        //get all offers feom database
        const offers = await axios
            .get("/api/offers")
            .then((res) => res.data)
            .catch((error) => {
                console.log(error);
                displayAlertBox("Please, try again later", error.message);
                // logout();
            });

        //for each offer get information about user
        //return map with offers and users data
        const offersWithUser = await Promise.all(
            offers.map(async (offer) => {
                const userData = await axios
                    .get(`/api/users/${offer.userId}`)
                    .then((res) => res.data)
                    .catch((error) => {
                        console.log(error);
                        displayAlertBox(
                            "Please, try again later",
                            error.message
                        );
                    });
                return { ...userData, ...offer };
            })
        ).catch((error) => {
            console.log(error);
            displayAlertBox("Please, try again later", error.message);
        });

        const notUsersOffers = offersWithUser.filter(
            (offer) => offer.userId !== auth.currentUser.uid
        );

        //function return offers with selected filters
        const filteredOffers = notUsersOffers.filter((offer) => {
            if (selectedFilters.length === 0) {
                return true;
            }
            if (
                (selectedFilters.includes("male") && offer.gender !== "male") ||
                (selectedFilters.includes("female") &&
                    offer.gender !== "female") ||
                (selectedFilters.includes("1st year") &&
                    offer.yearOfStudy !== "1") ||
                (selectedFilters.includes("2nd year") &&
                    offer.yearOfStudy !== "2") ||
                (selectedFilters.includes("3rd year") &&
                    offer.yearOfStudy !== "3") ||
                (selectedFilters.includes("4th year") &&
                    offer.yearOfStudy !== "4") ||
                (selectedFilters.includes("5th year") &&
                    offer.yearOfStudy !== "5") ||
                (selectedFilters.includes(">5th year") &&
                    offer.yearOfStudy !== ">5") ||
                (selectedFilters.includes("Sport") &&
                    offer.hobby !== "Sport") ||
                (selectedFilters.includes("Computers") &&
                    offer.hobby !== "Computers") ||
                (selectedFilters.includes("Cooking") &&
                    offer.hobby !== "Cooking") ||
                (selectedFilters.includes("Literature") &&
                    offer.hobby !== "Literature") ||
                (selectedFilters.includes("Journey") &&
                    offer.hobby !== "Journey") ||
                (selectedFilters.includes("Music") &&
                    offer.hobby !== "Music") ||
                (selectedFilters.includes("Video Games") &&
                    offer.hobby !== "Video Games")
            )
                return false;
            else return true;
        });

        return filteredOffers;
    };

    //reload main page
    function reload() {
        setLoading(true);
        setReloadSwitch(!reloadSwitch);
    }

    useEffect(() => {
        setTimeout(() => {
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
                    logout();
                });
        }, 1000);
    }, [reloadSwitch]);

    //on reloadSwith or selectedFilters change -> get current offers from database  
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
    }, [selectedFilters, reloadSwitch]);


    //if loading is true show LoadingAnimation component

    return (
        <SafeAreaView style={styles.containerMain}>
            {loading ? (
                <LoadingAnimation text="Loading please wait" />
            ) : (
                <SafeAreaView style={styles.container}>
                    <ProfileHeader
                        user={userData}
                        onPress={() => {
                            navigation.push("FavsOffers");
                        }}
                        onPressEdit={() => {
                            navigation.push("EditProfile");
                        }}
                    />
                    <ScrollView style={styles.scroll}>
                        <MultipleSelectList
                            boxStyles={styles.dropdown}
                            dropdownStyles={styles.dropdown}
                            setSelected={(val) => setSelectedFilters(val)}
                            data={filters}
                            save="value"
                            label="Filters"
                            placeholder="Select filters"
                            search={false}
                        />
                        {offersData.length === 0 ? (
                            <Text style={styles.notFoundText}>No offers</Text>
                        ) : (
                            offersData.map((offer, i) => {
                                const push = () => {
                                    console.log(offer.offerId);
                                    navigation.push("Offer", { offer: offer });
                                };

                                //console.log(offer)
                                return (
                                    <Card
                                        key={i}
                                        userFirstName={offer.firstName}
                                        userLastName={offer.lastName}
                                        description={offer.description}
                                        year={offer.yearOfStudy}
                                        imgUrl={offer.photoURL}
                                        title={offer.title}
                                        university={offer.university}
                                        idOffer={offer.offerId}
                                        onPress={push}
                                    />
                                );
                            })
                        )}
                        {/* Nawet to nie takie brzydkie trzeba dodać jakiś komunikat, że odświeżono, to samo można pododawac do innych screenów */}
                        <SignInBtn
                            style={styles.button}
                            onPress={reload}
                            title="Reload"
                        />
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
        margin: 0,
        width: "100%",
        backgroundColor: COLORS.background,
    },
    scroll: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        alignContent: "center",

        marginLeft: Dimensions.get("window").width * 0.1,
    },
    notFoundText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 40,
        marginLeft: 130,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginVertical: 10,
        marginLeft: 73,
        width: 200,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: COLORS.primary1,
    },
    dropdown: {
        width: "87%",
        fontSize: 13,
        margin: 8,
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        elevation: 3,
    },
});
