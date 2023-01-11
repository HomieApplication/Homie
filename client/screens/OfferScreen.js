import { Dimensions, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { PROVIDER_GOOGLE, Marker} from "react-native-maps";
import mapMarker from "../assets/icons8-marker.png";

import axios from 'axios'
import { async } from '@firebase/util';

import COLORS from '../components/assets';

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

    const Mapka = () => {
        if(typeof offerData.localization !== "undefined" && offerData.localization !== "")
        {
            return <MapView
            style={styles.map}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            loadingEnabled
            showsCompass = {true}
            initialRegion={{
                latitude: offerData.localization.latitude, 
                longitude: offerData.localization.longitude,
                latitudeDelta: 0.002,
                longitudeDelta: 0.0015,
              }}
        >
          <MapView.Marker image={mapMarker} coordinate={offerData.localization}></MapView.Marker>
        </MapView>
        }
        else
        {
            return <View style={styles.map}>
                <Text style={styles.mapErrorText}>
                    Unfurtunetly localization have not been seted yet 
                </Text>
                <Image
                    source={require("../assets/sad_earth.jpg")}
                    style={styles.earth}>
                </Image>
            </View>
        }   
    }
    
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
        <View style={{flex:1, width:'100%', backgroundColor: COLORS.background, justifyContent:'flex-start'}}>        
            <View style={styles.card}>
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
                         <MaterialCommunityIcons name="star" color={COLORS.star} size={35}/>
                     </Pressable>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.textTitle}>{offerData.title}</Text>
                    <Text style={styles.text}>{offer.description}</Text>
                    <View style={styles.galleryContainer}>
                      <View style={styles.galleryImg}><Text>GALERIA</Text></View>
                    </View>
                </View>
            </View>
            <View style={styles.mapContainer}>
                <View style={styles.map}>
                    <Mapka />
                </View>
                <View style={styles.mapText}>
                    <Text>Tu zrobić fajną listę</Text>
                    <Text>- Biedronka: 7min</Text>
                    <Text>- Kebab: 5min</Text>
                    <Text>- Miasteczko: 5min</Text>
                </View>
            </View>
        </View>
        </View>

    )
}

export default OfferScreen

const styles = StyleSheet.create({
    card:{
        width: '100%',
        height: '90%',
        marginBottom:20,
        marginTop:10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: COLORS.background,
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
        backgroundColor: COLORS.card,
        alignItems: 'center',
        width:'100%',
        flex:3,
        marginTop:30,
        borderRadius: 20,
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
      letterSpacing: 0.25,
      color: COLORS.textCard,
    },
                                      
    img:{
        width: '30%',
        aspectRatio: 1,
        borderRadius: 10,
        marginRight: 10,
      },

    headerContainer:{
        width: '100%',
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        flex:1,
    },
    headerText:{
        flex: 1,
    },
    icon:{
        position: 'absolute',
        right: 20,
        top: Dimensions.get('window').height *0.07,
      },

    descriptionContainer:{
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flex:2,
    },

    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: COLORS.textCard,
    },

    galleryContainer:{
       // borderWidth: 1,
        width: '100%',
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    galleryImg:{
        height: '90%',
        aspectRatio: 1,
        borderWidth: 1,
        borderRadius: 5,
        borderColor:'black',
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
    mapErrorText: {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
      },
    earth:{
        position:'absolute',
        resizeMode: "cover",
        height: 100,
        width: 150,
        left:"10%",
        top:"25%",
        zIndex:-1,
    },
})