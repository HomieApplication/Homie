import React from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';

const size = 100;

export default function Card(props) { 
  const { onPress, userName, userSecondName, description, year, imgUrl, localType, localization } = props;
  return (
    <View style={styles.container}>
        <View style={styles.upperHalf}>
            <Image style={styles.img} source={require('../../assets/cat.jpg')}/>
            <View>
                <Text style={styles.nameText}>{userName} {userSecondName}, {year} year</Text>
                <Text style={styles.description}>{localType}, {localization}</Text>
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
        marginVertical: 20,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
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