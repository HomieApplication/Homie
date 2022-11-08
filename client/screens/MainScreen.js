import React from 'react'; 
import { StyleSheet, Text, View } from 'react-native';

const MainScreen = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Text>To jest MainScreen! Tu będą wszytskie ogłoszenia! 1 strona po zalogowaniu</Text>
        </View>
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