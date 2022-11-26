import React from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';

const size = 100;

export default function Card(props) { //props
  const { onPress, userName, description, year, imgUrl } = props;
  return (
    <View style={styles.container}>
        <View>
            <Image style={styles.img} source={require('../../assets/cat.jpg')}/>
        </View>
        <View>

        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        width:'95%',
        height: size,
        marginVertical: 20,
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 10,

    },
    img:{
        width: size,
        height: size,
        borderRadius: 20
      },
});