import React, {useState} from 'react';
import { Text, View, StyleSheet, Pressable, Image, Dimensions, TouchableOpacity, Button } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import COLORS from '../assets';
const size = 80;

//Card componnet is used in MainScreen and My/FavsOffersScreen
//This component shows basic information about offer and its user
//if isMain == true: show delete option 

export default function Card(props) { 
  const { onPress, userFirstName,gender, userLastName, description, year, imgUrl, title, university, idOffer, isMine, deleteFunction, onStarClick } = props;
  const [isFav, setIsFav] = useState(false)


  function setAsFav(){
    setIsFav(true)
    onStarClick(isFav, idOffer)
  }


  function setAsNotFav(){
    setIsFav(false)
    onStarClick(isFav, idOffer)
  }


  return (
    <View style={styles.container}>

        
        <View style={styles.upperHalf}>
          <View style={styles.imgContainer}>
            <Image resizeMode={"cover"} style={styles.img} source={{uri: imgUrl}}/>
          </View>
            <View style={{width: '100%'}}>
              <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-between', width: '70%'}}>
                <Text style={styles.nameText}>{userFirstName} {userLastName}</Text>
                {!isMine ? <View style={styles.iconStar}>
                    {isFav ? (
                        <MaterialCommunityIcons name="star" color={COLORS.star} size={35} onPress={() => setAsNotFav()}/> 
                      ) :(
                        <MaterialCommunityIcons name="star-outline" color={COLORS.star} size={35} onPress={() => setAsFav()}/>
                      )
                    }
                    
                  </View> : <View style={styles.iconStar} >
                      <MaterialCommunityIcons name="delete-outline" color={COLORS.primary1} size={35} onPress={()=>deleteFunction()}/> 
                  </View>
                }


              </View>
                
                <Text style={styles.description}>{university}</Text> 
                <Text style={styles.description}>{year} year, {gender}</Text>
            </View>





        </View>
        <View>
            <Text style={styles.nameText}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Pressable style={styles.icon} onPress={onPress}>
            <MaterialCommunityIcons name="chevron-down" color={'black'} size={40}/>
          </Pressable>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        width:'90%',
        marginVertical: 15,
        backgroundColor: COLORS.card,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.10,
        shadowRadius: 2.22,
    
        elevation: 1,
        padding: 10,
    },
    iconContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      padding:0,
      margin:0,
    },
    imgContainer:{
      width: size,
      height: size,
      marginRight: 10,
      marginBottom: 10,
      
    },
    img:{
        borderWidth: 0.5,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        borderColor: COLORS.primary1,
        borderRadius: 10,
        overflow: 'hidden'
      },
    upperHalf:{
        flexDirection: 'row',
    },
    nameText:{
        color: COLORS.textCard,
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    description: {
        letterSpacing: 0.25,
        color:'#0a3854',
    },
    icon:{
      height:35,
      padding:0,
      margin:0,
    },
    iconStar:{
      // position: 'absolute',
      //left: Dimensions.get('window').width * 0.77,
      //top: 10,

      padding:0,
      margin:0,

    },
});