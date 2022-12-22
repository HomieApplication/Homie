import React from 'react';
import { Text, View, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const size = 80;

export default function Card(props) { 
  const { onPress, userFirstName, userLastName, description, year, imgUrl, localType, localization, idOffer, navigation } = props;

  Card.defaultProps = {
    imgUrl: require('../../assets/defaultImg.png')
  }

  //trzeba będzie zrobić system favs - zmiana ikonki na 'star' i color też trzeba zmienic po kliknięciu 
  return (
    <View style={styles.container}>
        <Pressable style={styles.iconStar}>
          <MaterialCommunityIcons name="star-outline" color={'black'} size={35}/> 
        </Pressable>
        <View style={styles.upperHalf}>
            <Image style={styles.img} source={imgUrl}/>
            <View>
                <Text style={styles.nameText}>{userFirstName} {userLastName}</Text>
                <Text style={styles.description}>{localType}, {localization}, {year} year</Text>
            </View>
        </View>
        <View>
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
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    
        elevation: 2,
        padding: 10,
    },
    iconContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      padding:0,
      margin:0,
    },
    img:{
        width: size,
        height: size,
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 10,
      },
    upperHalf:{
        flexDirection: 'row',
    },
    nameText:{
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'grey',
    },
    description: {
        letterSpacing: 0.25,
        color:'grey',
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