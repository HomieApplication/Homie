import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, {useState, useEffect} from 'react'
import COLORS from '../assets.js'
import SignInBtn from '../signIn/SignInBtn.js';

const size = 120;

const ProfileHeader = (props) => {
  const { user, onPress, onPressEdit } = props;
  const [userData, setUserData] = useState([]);

  useEffect(()=>{
    setUserData(user)
  },[])
  
  ProfileHeader.defaultProps = {
    img: require('../../assets/defaultImg.png'),
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.h1}>Hi, {userData.firstName}!</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Year of study: {userData.yearOfStudy}</Text>
          <Text style={styles.textDescription}>{userData.description}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <SignInBtn
              style={styles.button}
              title="Edit Profile"
              onPress={onPressEdit}
            >
            </SignInBtn>
            <Pressable style={styles.icon}>
              <MaterialCommunityIcons name="star" color={COLORS.star} size={35} onPress={onPress}/>
            </Pressable>
          </View>

        </View>
      </View>    
      <Image style={styles.img} source={{uri: userData.photoURL}}/>
      
    </View>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({
  container:{
    height: '20%',
    width: '95%',
    backgroundColor: COLORS.primary1,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingVertical: 10,
    paddingBottom:20,
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
    justifyContent: 'space-between',
  },
  textDescription:{
    color: COLORS.textProfile,
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
    color: COLORS.textProfile,
    fontSize: 22,
  },
  text: {
    color: COLORS.textProfile,
    fontSize: 20,
  },
  icon:{
    marginRight: 20
  },
  button: {
    alignItems: "flex-start",
    justifyContent: 'center',
    width: "50%",
    paddingVertical: 2,
    marginTop: 2,
    borderRadius: 5,

    backgroundColor: "transparent",
},
})