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

const MyOffers = () => {

    const userId = getAuth().currentUser.uid;
    const [myOffersIds, setmyOffersIds] = useState([]);

    useEffect(() => {
        axios
            .get('api/users/my-offers')
            .then((res) => res.data)
            .then((data) => {
                setmyOffersIds(data);
                console.log(data);
            })
            .catch((error) => {
                console.log("Connection error: " + error.message);
                displayAlertBox("Please, try again later", error.message);
            });
    }, []);



    return(
        <View style={{flex:1, justifyContent:'center', alignItems: 'center',}}>
            <Text>MyOffers</Text>
        </View>
    )
}
export default MyOffers