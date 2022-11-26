import React, {useState, useEffect} from 'react'; 
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileHeader from '../components/userProfile/ProfileHeader'
import Card from '../components/mainScreen/Card';
import { getAuth } from 'firebase/auth';




const MainScreen = ({ navigation }) => {
    userId = getAuth().currentUser.uid;
    const [userData, setUser] = useState({});
    useEffect(() => {
        fetch(`http://192.168.123.89:3000/api/users/${userId}`).then(res => res.json()).then(data => setUser(data));
    }, [])
    return(
        <SafeAreaView style={styles.container}>

            <ProfileHeader userName={userData.firstName} year={userData.yearOfStudy}/>
            <Card />
            {/* <FlatList 
            
            
            /> */}
        </SafeAreaView>
    )
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
  });