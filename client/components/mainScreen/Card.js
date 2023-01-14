import React, {useState} from 'react';
import { Text, View, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import COLORS from '../assets';
const size = 80;

export default function Card(props) { 
  const { onPress, userFirstName, userLastName, description, year, imgUrl, title, university, idOffer, isMine, deleteFunction } = props;
  const [isFav, setIsFav] = useState(false)


  return (
    <View style={styles.container}>
      {!isMine ? (
        <Pressable style={styles.iconStar}>
        {isFav ? (
          <MaterialCommunityIcons name="star" color={COLORS.star} size={35} onPress={() => setIsFav(false)}/> 
        ) :(
          <MaterialCommunityIcons name="star-outline" color={COLORS.star} size={35} onPress={() => setIsFav(true)}/>
        )
        }
        
      </Pressable>
      ): (
        <Pressable style={styles.iconStar}>
          <MaterialCommunityIcons name="delete-outline" color={COLORS.primary1} size={35} onPress={deleteFunction}/> 
        </Pressable>
      )
      }
        
        <View style={styles.upperHalf}>
          <View style={styles.imgContainer}>
            <Image resizeMode={"cover"} style={styles.img} source={{uri: imgUrl}}/>
          </View>
            <View>
                <Text style={styles.nameText}>{userFirstName} {userLastName}</Text>
                <Text style={styles.description}>{university} {year} year</Text>
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
      position: 'absolute',
      left: Dimensions.get('window').width * 0.77,
      top: 10,

      padding:0,
      margin:0,

    },
});