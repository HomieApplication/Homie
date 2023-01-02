import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react'
import SignInBtn from "../signIn/SignInBtn";

const size = 120;

const ProfileHeader = (props) => {
  const { userFirstName, year, img, id, onPress } = props;
  
  ProfileHeader.defaultProps = {
    img: require('../../assets/defaultImg.png'),
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.h1}>Hi, {userFirstName}!</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Year of study: {year}</Text>
          <Text style={styles.textDescription}>You can edit your profile in UserProfile screen! Tap right icon at the Tab bar.</Text>
          <SignInBtn
                    style={styles.button}
                    title="Edit"
                    onPress={onPress}
                ></SignInBtn>
        </View>
        <Pressable style={styles.icon}>
          <MaterialCommunityIcons name="star" color={'yellow'} size={35}/>
        </Pressable>
      </View>    
      <Image style={styles.img} source={img}/>
      
    </View>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({
  container:{
    height: '20%',
    width: '95%',
    backgroundColor: '#114B5F',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2,
    marginBottom: size/1.8,
  },
  headerContainer:{
    flex:1,
    flexDirection:'row',
    width:'100%',
    justifyContent: 'space-between',
  },
  textContainer:{
    width:'50%',
    paddingTop: 10,
  },
  textDescription:{
    color: '#fff',
    fontSize: 13,
    paddingTop: 10,
  },
  img:{
    position: 'absolute',
    top: Dimensions.get('window').height*0.09,
    right: Dimensions.get('window').width*0.6,
    width: size,
    height: size,
    borderRadius: size/2
  },
  h1:{
    paddingLeft: size/6,
    paddingTop: 10,
    color: '#fff',
    fontSize: 22,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  icon:{
    position: 'absolute',
    left: Dimensions.get('window').width * 0.8,
    top: size*0.75,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    paddingVertical: 2,
    // paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 9,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: "#1a936f",
},
})