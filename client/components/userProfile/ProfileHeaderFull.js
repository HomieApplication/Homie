import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useEffect, useState } from 'react'
import COLORS from '../assets.js'
import Hobby from './Hobby.js';

const size = 120;

//ProfileHeaderFull is component which shows log in user data but with details
//used in UserProfile screen

const ProfileHeaderFull = (props) => {
  const { user } = props;
  const [userData, setUserData] = useState([]);

  useEffect(()=>{
    setUserData(user)
  },[])
  
  return (
    <View style={styles.container}>

        <View style={styles.imageAndFullName}>
            <Image style={styles.img} source={{uri: userData.photoURL}}/>
            <View style={{flex: 1, marginLeft: 10, alignItems: 'flex-start' }}>
                 <Text style={styles.h1}>{userData.firstName} {userData.lastName}</Text>
                 <Text style={styles.text}>Year of study: {userData.yearOfStudy}</Text>
                 <Text style={styles.text}>University: {userData.university}</Text>
            </View>
        </View>
        <View style={styles.hobbyAndDescription}>
            <Text style={styles.text}>{userData.description}</Text>
            <Text style={[styles.h1,{marginTop: 10}]}>My interests:</Text>
            {typeof userData.interests !== 'undefined' ? (
              <View style={styles.list}>
                {userData.interests.map(hobby => {
                  return(
                    <Hobby key={hobby} textStyle={styles.textHobby} name={hobby}/>
                  )
                })}
              </View>
            ): (
                null
            )}
        </View>
      
    </View>
  )
}

export default ProfileHeaderFull

const styles = StyleSheet.create({
  container:{
    flex: 2,
    width: '95%',
    backgroundColor: COLORS.primary1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2,
    marginBottom: 10,
  },

  imageAndFullName:{
    height:size,
    width: '100%',
    marginBottom:10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',  
    alignItems: 'flex-start',
    paddingHorizontal:5,
    
  },

  hobbyAndDescription:{
    width: '90%',
  },

  img:{
    width: size,
    height: size,
    borderRadius: size/10,
    marginLeft: 10,
  },
  h1: {
    color: COLORS.textProfile,
    fontSize: 24,
    marginBottom: 5,
  },
  text: {
    color: COLORS.textProfile,
    fontSize: 14,
  },
  icon:{
    position: 'absolute',
    left: Dimensions.get('window').width * 0.8,
    top: size*0.75,
  },
  list:{
    padding:5,
    paddingLeft: 20,
    borderWidth:1,
    borderColor: COLORS.background,
    borderRadius: 10,
  },
  textHobby: {
    color: COLORS.background,
  },
})