import React from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';

const size = 80;

export default function Card(props) { 
  const { onPress, userFirstName, userLastName, description, year, imgUrl, localType, localization } = props;

  Card.defaultProps = {
    imgUrl: require('../../assets/defaultImg.png')
  }

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        width:'95%',
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
});