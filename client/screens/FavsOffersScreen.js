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
import axios from "axios";
import { getAuth } from "@firebase/auth";

const FavsOffers = () => {

    const userId = getAuth().currentUser.uid;
    const [favsOffersIds, setfavsOffersIds] = useState([]);

    useEffect(() => {
        axios
            .get('api/users/favs')
            .then((res) => res.data)
            .then((data) => {
                setfavsOffersIds(data);
                console.log(data);
            })
            .catch((error) => {
                console.log("Connection error: " + error.message);
                displayAlertBox("Please, try again later", error.message);
            });
    }, []);



    return(
        <View style={{flex:1, justifyContent:'center', alignItems: 'center',}}>
            <Text>FavsOffers</Text>
        </View>
    )
}
export default FavsOffers