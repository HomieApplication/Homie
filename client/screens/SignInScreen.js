import React from 'react'; 
import { StyleSheet, Text, View, TextInput, Image, Dimensions, Alert, TouchableOpacity } from 'react-native';

import firebase from 'firebase/app';
import 'firebase/auth';

import SignInBtn from '../components/signIn/SignInBtn';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignInScreen = ({ navigation }) => {

    const [login, onChangeLogin] = React.useState("");
    const [password, onChangePassword] = React.useState("");


    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/Logo.png')} style={styles.img}></Image>

            </View>
            <View style={styles.signInCard}>
                <Text style={styles.h2}>Sign In</Text>
                <TextInput style={styles.textboxes} onChangeText={onChangeLogin} value={login} placeholder="Login"/>
                <TextInput style={styles.textboxes} onChangeText={onChangePassword} value={password} placeholder="Password" secureTextEntry/>
                <SignInBtn style={styles.button} title="Confirm" onPress={() => {
                        navigation.push('Main')
                    }}>
                </SignInBtn>
            </View>
            <View style={styles.BottomContainer}>
                <TouchableOpacity>
                    <Text style={styles.register} onPress={() => {navigation.push('SignUp')}} >Register here</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.register}>Forgot password</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SignInScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width:'100%',
        backgroundColor: '#114B5F',
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
    button: {
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
      },
    textboxes: {
        width: '90%',
        fontSize: 15,
        padding: '5%',
        margin: 10,
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    register:{
        position:'relative',
        color: 'white',
        top: 10
    },
    h2: {
        fontSize: 30,
        marginVertical: 5,
        color: '#1A936F',
    },
    BottomContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});