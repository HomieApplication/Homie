import { Dimensions, StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { PROVIDER_GOOGLE, Marker} from "react-native-maps";
import mapMarker from "../assets/icons8-marker.png";
import { constPlaces } from '../components/OfferScreen/ConstMarkers';

import axios from 'axios'
import { async } from '@firebase/util';

import COLORS from '../components/assets';
import Gallery from '../components/OfferScreen/Gallery';
import Hobby from '../components/userProfile/Hobby';

const fetchUser = async (o) => {
    const userData = await axios
        .get(`/api/users/${o.userId}`)
        .then((res) => res.data)
        .catch((error) => {
            console.log(error);
        });

    //console.log(userData)
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
            style={styles.map2}
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
          <MapView.Marker coordinate={offerData.localization}>
            <Image
                source={mapMarker}
                style={{width:30, height:30}}
            />
          </MapView.Marker>
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

    const FancyList = () =>{
        if(typeof offerData.localization !== "undefined" && offerData.localization !== ""){
            return <View>
                    {constPlaces.map((marker, i) => (
                        <Text key={i} style={[styles.text,{marginVertical:3, fontSize: 13}]}>{marker.title}: {distanceFromCoordinates(marker.coordinates, offerData.localization)}km</Text>
                    ))}
                    </View>
        }
        else return <View>
                    {constPlaces.map((marker, i) => (
                        <Text key={i} style={[styles.text,{marginVertical:3, fontSize: 13}]}>{marker.title}: who knows?...</Text>
                    ))}
                    </View>
    }

    function distanceFromCoordinates(loc1, loc2) {
        var lat1 = loc1.latitude;
        var lon1 = loc1.longitude;
        var lat2 = loc2.latitude;
        var lon2 = loc2.longitude;
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c; // in metres
        return (d/1000).toPrecision(2);
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
            //console.log("fetchUser")
    }, [])


    return (
        <View style={{flex:1, width:'100%', backgroundColor: COLORS.background, justifyContent:'flex-start'}}>   
        <ScrollView style={{width:'100%'}}>       
            <View style={styles.card}>
            <View style={styles.contentContainer}>
                <Pressable style={styles.goBack}>
                    <MaterialCommunityIcons name="arrow-left" color={COLORS.primary1} size={35} onPress={navigation.goBack}/>
                </Pressable>
                <View style={styles.headerContainer}>
                    <Image
                        source={{uri: userData.photoURL}}
                        style={styles.img}>
                    </Image>
                    <View style={styles.headerText}>
                        <Text style={styles.textTitle}>{userData.firstName} {userData.lastName}</Text>
                        <Text style={[styles.text, {fontSize: 12}]}>Year of study: {userData.yearOfStudy}</Text>
                        <Text style={[styles.text, {fontSize: 12}]}>University: {userData.university}</Text>
                        <Text style={[styles.text, {fontSize: 12}]}>{userData.description}</Text>
                    </View>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.textTitle}>{offerData.title}</Text>
                    <Text style={styles.text}>{offer.description}</Text>
                    <Text style={[styles.textTitle, {marginTop: 15}]}>
                        My interests:
                    </Text>
                    {typeof userData.interests !== 'undefined' ? (
                        <View style={styles.list}>
                            {userData.interests.map(hobby => {
                            return(
                                <Hobby key={hobby} textStyle={styles.text} name={hobby}/>
                            )
                            })}
                        </View>
                    ): (
                        null
                    )}
                    <View style={styles.galleryContainer}>
                      <Gallery images={offerData.photoURLArray}/>
                    </View>
                </View>
            </View>
            <View style={styles.mapContainer}>
                <View style={styles.map}>
                    <Mapka />
                </View>
                <View style={styles.mapText}>
                    <FancyList></FancyList>
                </View>
            </View>
        </View>
        </ScrollView>
        </View>

    )
}

export default OfferScreen

const styles = StyleSheet.create({
    card:{
        width: '100%',
        height: '90%',
        paddingTop:40,
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
        paddingTop: 70,
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
        marginTop:30,
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

    list:{
        padding:5,
        paddingLeft: 20,
        borderWidth:1,
        borderColor: COLORS.primary1,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 10
    },

    galleryContainer:{
        width: '100%',
        paddingVertical: 10,
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    //map

    mapContainer:{
        flex:1,
        width:'100%', 
        flexDirection: 'row',
        paddingVertical: 10,
        paddingBottom: 50,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 20,
    },
    map:{
        //borderWidth: 1,
        borderRadius: 5,
        //borderColor:'#114B5F',
        flex:4,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    map2:{
        borderWidth: 1,
        borderRadius: 5,
        borderColor:'#114B5F',
        flex:1,
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

    goBack:{
        position: 'absolute',
        left: 20,
        top: 50,
    }
})