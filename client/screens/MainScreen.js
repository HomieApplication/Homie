import React from 'react'; 
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileHeader from '../components/userProfile/ProfileHeader'
import Card from '../components/mainScreen/Card';




const MainScreen = ({ navigation }) => {
    return(
        <SafeAreaView style={styles.container}>

            <ProfileHeader userName="Kinga" year='2'/>
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