import React from 'react'; 
import { StyleSheet, Text, View, TextInput } from 'react-native';

const MainScreen = () => {
    const [login, onChangeLogin] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
    return(
        <View style={styles.container}>
            <Text>To jest MainScreen! Tu będą wszytskie ogłoszenia! 1 strona po zalogowaniu</Text>
            <TextInput
        style={styles.textboxes}
        onChangeText={onChangeLogin}
        value={login}
        placeholder="insert your login"
      />
            <TextInput
        style={styles.textboxes}
        onChangeText={onChangePassword}
        value={password}
        placeholder="insert your password"
      />
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
        fontSize: '18pt',
        padding: '5%',
        borderColor: 'grey',
        borderWidth: "1pt",
        borderRadius: '10pt',
    }
  });