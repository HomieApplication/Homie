import { Text, View, StyleSheet, FlatList, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'

import ProfileHeader from '../components/userProfile/ProfileHeader'
import Tab from '../components/userProfile/Tab'

const Tabs = [
  {
    id: '1',
    title: 'Ulubione'
  },
  {
    id: '2',
    title: 'Ustawienia',
  },
  {
    id: '3',
    title: 'O Autorach',
  },
  {
    id: '4',
    title: 'Regulamin',
  },
]


const UserProfile = () => {

  const renderItem = ({ item }) => (
    <Tab title={item.title} />
  );

    return (
      <View style={styles.container}>
        <ProfileHeader />
        <FlatList 
          data={Tabs}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.list}          
          />
      </View>
    )
}

export default UserProfile

const styles = new StyleSheet.create({
    container:{
      flex:1,
      width:'100%',
      marginTop: StatusBar.currentHeight || 0,
      backgroundColor: '#f2f2f2',
      alignItems: 'center',
    },
    list:{
      width: '100%',
    }
})