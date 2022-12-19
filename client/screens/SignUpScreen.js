import React from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TextInput,
    useState,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchableDropdown from "react-native-searchable-dropdown";
import SignInBtn from "../components/signIn/SignInBtn";

import { register } from "../components/auth";

const SignUpScreen = ({ navigation }) => {
    //jescze nie wiem jak zrobić taką fajną listę nie działa wybieranie

    const [login, onChangeLogin] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [firstName, onChangeFirstName] = React.useState();
    const [secondName, onChangeSecondName] = React.useState();
    const [yearOfStudy, onChangeyearOfStudy] = React.useState();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.h2}>Create Account</Text>
            <TextInput
                style={styles.textboxes}
                onChangeText={onChangeLogin}
                value={login}
                placeholder="Login (Email)"
            />
            <TextInput
                style={styles.textboxes}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
                secureTextEntry
            />
            <TextInput
                style={styles.textboxes}
                onChangeText={onChangeFirstName}
                value={firstName}
                placeholder="First name"
            />
            <TextInput
                style={styles.textboxes}
                onChangeText={onChangeSecondName}
                value={secondName}
                placeholder="Second name"
            />
            <TextInput
                style={styles.textboxes}
                onChangeText={onChangeyearOfStudy}
                value={yearOfStudy}
                placeholder="Year of study"
            />

            <SignInBtn
                style={styles.button}
                title="Sign up"
                onPress={() => {
                    try {
                        register(login, password, {
                            firstName: firstName,
                            lastName: secondName,
                            yearOfStudy: yearOfStudy,
                        });
                    } catch (error) {
                        displayAlertBox("Failed to register", error.message);
                    }
                    // navigation.push('Main')
                }}
            ></SignInBtn>
        </SafeAreaView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    h2: {
        fontSize: 30,
        marginVertical: 5,
        color: "#1A936F",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
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
        backgroundColor: "#1a936f",
    },
    textboxes: {
        width: "90%",
        fontSize: 15,
        padding: "5%",
        margin: 8,
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
});
