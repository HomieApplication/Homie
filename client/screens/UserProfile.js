import { Text, View, StyleSheet, FlatList, SafeAreaView, StatusBar, Button } from 'react-native'
import React from 'react'

import ProfileHeader from '../components/userProfile/ProfileHeader'
import Tab from '../components/userProfile/Tab'
import SignInBtn from '../components/signIn/SignInBtn'
import { logout } from '../components/auth'

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


const UserProfile = ({ navigation }) => {

  const renderItem = ({ item }) => (
    <Tab title={item.title} />
  );

    return (
      <View style={styles.container}>
        <ProfileHeader userName="Kinga"/>
        <FlatList 
          data={Tabs}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.list}          
          />
          <SignInBtn title="Log out" style={styles.btn} onPress={() => {
                        logout()
                        navigation.push('SignIn')
                    }}
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
      justifyContent: 'space-between',
    },
    list:{
      width: '100%',
    },
    btn: {
      alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginVertical: 10,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    
        elevation: 3,
        backgroundColor: '#1a936f',
    }
})