import { Dimensions, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from '../assets'

//Gallery component used in OfferScrren
//shows images added to offer

const Gallery = (props) => {
    const {images} = props;
    const [index, setIndex] = useState(0);

    console.log(images)

    var maxIndex = 0;

    const prevImg = () =>{
        maxIndex = images.length-1;
        if(index == 0){
            setIndex(maxIndex);
        }else{
            setIndex(index-1);
        }
    }

    const nextImg = () =>{
        maxIndex = images.length-1;
        if(index == maxIndex){
            setIndex(0);
        }else{
            setIndex(index+1);
        }
    }

    return(
        <View style={styles.container}>

            <Pressable style={styles.goBack}>
                <MaterialCommunityIcons name="arrow-left" color={COLORS.primary1} size={35} onPress={() => prevImg()}/>
            </Pressable>

            <View style={styles.galleryContainer}>
                {images != undefined ? (
                    <Image
                        style={styles.img}
                        source={{uri: images[index]}}>
                     </Image>
                
                ): (
                    <Text>Nie ma zdjęć</Text>
                )}

            </View>
            

            <Pressable style={styles.goBack}>
                <MaterialCommunityIcons name="arrow-right" color={COLORS.primary1} size={35} onPress={() => nextImg()}/>
            </Pressable>
        </View>
    )
}

export default Gallery;


const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        //backgroundColor: COLORS.primary1,
    },
    galleryContainer:{
        width:'65%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img:{
        width: '100%',
        aspectRatio: 1,
        borderRadius: 10,
        marginRight: 10,
      },
})