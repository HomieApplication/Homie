import { Dimensions, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import axios from 'axios'
import { async } from '@firebase/util';


const fetchUser = async (o) => {
    const userData = await axios
        .get(`/api/users/${o.userId}`)
        .then((res) => res.data)
        .catch((error) => {
            console.log(error);
        });

    console.log(userData)
    return userData
}

const OfferScreen = ({route, navigation}) => {

    const [userData, setUserData] = useState([]);

    const [offerData, setOfferData] = useState([]);
    const {offer} = route.params;  

    useEffect(()=>{
        setOfferData(offer)
    },[])

    
    useEffect(() => {
        fetchUser(offer)
            .then((user) => {
                setUserData(user)
            })
            .catch((error) => {
                console.log(error);
                displayAlertBox("Please, try again later", error.message);
            })
            console.log("fetchUser")
    }, [])

    //w miejscu map tzreba wstawić mape googla z pineską na lkalizacje danego akademika/mieszkania
    //obok fajnie by było wyświetlać odległości do kluczowych miejsc np kebab

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Image
                        source={require("../assets/defaultImg.png")}
                        style={styles.img}>
                    </Image>
                    <View style={styles.headerText}>
                        <Text style={styles.textTitle}>{userData.firstName} {userData.lastName}</Text>
                        <Text style={styles.text}>year of study: {userData.yearOfStudy}</Text>
                        <Text style={styles.text}>Brak opisu</Text>
                        {/* <Text style={styles.text}>{userData.description}</Text> */}
                    </View>
                    <Pressable style={styles.icon}>
                         <MaterialCommunityIcons name="star" color={'white'} size={35}/>
                     </Pressable>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.textTitle}>TU BĘDZIE TYTUŁ OGŁOSZENIA</Text>
                    <Text style={styles.text}>{offer.description}</Text>
                </View>
            </View>
            <View style={styles.mapContainer}>
                <View style={styles.map}>
                    <Text>MAPA</Text>
                </View>
                <View style={styles.mapText}>
                    <Text>Tu zrobić fajną listę</Text>
                    <Text>- Biedronka: 7min</Text>
                    <Text>- Kebab: 5min</Text>
                    <Text>- Miasteczko: 5min</Text>
                </View>
            </View>
        </View>
    )
}

export default OfferScreen

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '90%',
        marginBottom:20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'a8a8a8',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    
        elevation: 2,
    },
    contentContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        color: 'a8a8a8',
        width:'100%',
        flex:3,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    
        elevation: 2,
    },
    text:{
      fontSize: 15,
      //fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'grey',
    },
                                      
    img:{
        width: '30%',
        aspectRatio: 1,
        borderRadius: 10,
        marginRight: 10,
      },

    headerContainer:{
        width: '100%',
        paddingTop: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        //backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
    },
    headerText:{
        flex: 1,
        //backgroundColor: 'red',
    },
    icon:{
        position: 'absolute',
        left: Dimensions.get('window').width * 0.8,
        top: 20,
      },

    descriptionContainer:{
        width: '100%',
        padding: 10,
        flex:2,
    },

    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: "#114B5F",
    },

    //map

    mapContainer:{
        flex:1,
        width:'100%', 
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    map:{
        borderWidth: 1,
        borderRadius: 5,
        borderColor:'#114B5F',
        flex:4,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    mapText:{
        flex:3,
        marginVertical: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
})