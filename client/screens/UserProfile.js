import {
    Text,
    View,
    StyleSheet,
    FlatList,
    SafeAreaView,
    StatusBar,
    Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import Tab from "../components/userProfile/Tab";
import SignInBtn from "../components/signIn/SignInBtn";
import ProfileHeaderFull from "../components/userProfile/ProfileHeaderFull";
import axios from "axios";

import { logout } from "../components/auth";
import { getAuth } from "@firebase/auth";
import { displayAlertBox } from "../components/alert";
import COLORS from "../components/assets";
import LoadingAnimation from "../components/LoadingAnimation";


const Tabs = [
    {
        id: "1",
        title: "Favourite offers",
        routeName: "FavsOffers"
    },
    {
        id: "2",
        title: "My offers",
        routeName: "MyOffers"
    },
];

const UserProfile = ({ navigation }) => {
    const userId = getAuth().currentUser.uid;
    const [userData, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`/api/users/${userId}`)
            .then((res) => res.data)
            .then((data) => {
                setUser(data);
                //console.log(data);
            })
            .then(() => setLoading(false))
            .catch((error) => {
                console.log("Connection error: " + error.message);
                displayAlertBox("Please, try again later", error.message);
            });
    }, []);

    return (
        <SafeAreaView style={styles.containerMain}>
            {loading ? (
                <LoadingAnimation text="Loading please wait" />
            ) :(
                <View style={styles.container}>
                    <ProfileHeaderFull user={userData}/>
                        {Tabs.map((item) => { return <Tab key={item.id} title={item.title} onPress={() => navigation.push(item.routeName)}/>; })}
                        <SignInBtn
                            title="Log out"
                            style={styles.btn}
                            onPress={() => {
                                try {
                                    logout();
                                } catch (error) {
                                    displayAlertBox("Failed to sign out", error.message);
                                }
                            }}
                        />
                </View>
            )}

            
        </SafeAreaView>
    );
};

export default UserProfile;

const styles = new StyleSheet.create({
    containerMain: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    list: {
        width: "100%",
    },
    btn: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginVertical: 10,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        backgroundColor: COLORS.button,
    },
});
