import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfileHeader = () => {
  return (
    <View style={styles.container}>
      <Text>ProfileHeader</Text>
    </View>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({
  container:{
    height: '50%',
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom:8,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2,
  }
})