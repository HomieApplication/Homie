import React from 'react'; 
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-web';

const MainScreen = () => {
    return(
        <View style={styles.container}>
            <Text>To jest MainScreen! Tu będą wszytskie ogłoszenia! 1 strona po zalogowaniu</Text>
            <TextInput value=' ' placeholder = "username" style = {styles.textboxes} ></TextInput>
            <TextInput value=' ' placeholder = "password" style = {styles.textboxes} ></TextInput>

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
    textboxes: {
        width: '90%',
        fontSize: '18',
        padding: '12',
        borderColor: 'grey',
        borderWidth: "0.2",
        borderRadius: '10',
    }
  });