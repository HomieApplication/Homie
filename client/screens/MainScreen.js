import React from 'react'; 
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



const MainScreen = ({ navigation }) => {
    return(
        <SafeAreaView style={styles.container}>
            <Text>To jest MainScreen! Tu będą wszytskie ogłoszenia! 1 strona po zalogowaniu</Text>
        </SafeAreaView>
    )
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });