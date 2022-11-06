import React from 'react'; 
import { StyleSheet, Text, View, TextInput, Image, Dimensions, Alert, TouchableOpacity } from 'react-native';

import SignInBtn from '../components/signIn/SignInBtn';

const SignInScreen = () => {

    const [login, onChangeLogin] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);

    const sendData = () =>{
        Alert.alert(
            "Udało się wysłać dane",
            "xd nie",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { 
                    text: "OK", 
                    onPress: () => console.log("OK Pressed") 
                }
            ]
        )
    } 

    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/HomieLogo.png')} style={styles.img}></Image>
                {/* <Text style={styles.h1}>Homie</Text> */}
            </View>
            <View style={styles.signInCard}>
                <Text style={styles.h2}>Sign In</Text>
                <TextInput style={styles.textboxes} onChangeText={onChangeLogin} value={login} placeholder="Login"/>
                <TextInput style={styles.textboxes} onChangeText={onChangePassword} value={password} placeholder="Password" secureTextEntry/>
                <SignInBtn title="Confirm" onPress={sendData}></SignInBtn>
            </View>
            <TouchableOpacity>
                <Text style={styles.register} onPress={sendData} >Register here</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignInScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width:'100%',
        backgroundColor: '#679436ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        position:'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '40%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    h1: {
        fontSize: 70,
        marginVertical: 5,
        color: '#fff',
    },
    img: {
        height: '90%',
        aspectRatio: 1,
    },
    signInCard:{
        height: Dimensions.get('window').height * 0.4,
        width: '90%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    textboxes: {
        width: '90%',
        fontSize: 15,
        padding: '5%',
        margin: 10,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
    },
    register:{
        position:'relative',
        color: 'white',
        top: 10
    },
    h2: {
        fontSize: 30,
        marginVertical: 5,
    }

});