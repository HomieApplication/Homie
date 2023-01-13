import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SignInBtn from "../components/signIn/SignInBtn";
import { displayAlertBox } from "../components/alert";
import { register } from "../components/auth";

const SignUpScreen = ({ navigation }) => {
    const [login, onChangeLogin] = useState("");
    const [password, onChangePassword] = useState("");
    const [confirmedPassword, onChangeConfirmedPassword] = useState("");
    const [firstName, onChangeFirstName] = useState("");
    const [secondName, onChangeSecondName] = useState("");
    const [yearOfStudy, onChangeYearOfStudy] = useState("");
    const [matchingPasswords, setMatchingPasswords] = useState(true);
    const [correctPassword, setCorrectPassword] = useState(true);
    const [correctEmail, setCorrectEmail] = useState(true);

    // const years = [
    //     { id: "1", value: "1st" },
    //     { id: "2", value: "2nd" },
    //     { id: "3", value: "3rd" },
    //     { id: "4", value: "4th" },
    //     { id: "5", value: "5th" },
    //     { id: ">5", value: ">5th" },
    // ];

    useEffect(() => {
        if (password.length < 6 && password.length > 0) {
            setCorrectPassword(false);
        } else {
            setCorrectPassword(true);
        }
    }, [password]);

    useEffect(() => {
        if (!validateEmail(login) && login.length > 0) {
            setCorrectEmail(false);
        } else {
            setCorrectEmail(true);
        }
    }, [login]);

    useEffect(() => {
        if (password !== confirmedPassword && confirmedPassword.length > 0) {
            setMatchingPasswords(false);
        } else {
            setMatchingPasswords(true);
        }
    }, [password, confirmedPassword]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.h2}>Create Account</Text>
            {/* <ScrollView style={styles.scroll}> */}
            <TextInput
                style={styles.textboxes}
                onChangeText={onChangeLogin}
                value={login}
                placeholder="Email address"
            />
            {!correctEmail && (
                <Text style={{ color: "red" }}>Invalid email!</Text>
            )}
            <TextInput
                style={styles.textboxes}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
                secureTextEntry
            />
            {!correctPassword && (
                <Text style={{ color: "red" }}>Password too short!</Text>
            )}
            <TextInput
                style={styles.textboxes}
                onChangeText={onChangeConfirmedPassword}
                value={confirmedPassword}
                placeholder="Confirm password"
                secureTextEntry
            />
            {!matchingPasswords && (
                <Text style={{ color: "red" }}>Different passwords!</Text>
            )}
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
            {/* zamiast tego trzeba zrobić żeby rok studiów wybierało się z listy */}
            <TextInput
                style={styles.textboxes}
                onChangeText={onChangeYearOfStudy}
                value={yearOfStudy}
                placeholder="Year of study"
            />
            {/* </ScrollView> */}
            <SignInBtn
                style={styles.button}
                title="Sign up"
                onPress={() => {
                    if (!correctEmail || login === "") {
                        displayAlertBox("Failed to register", "Invalid email!");
                    } else if (!correctPassword || password === "") {
                        displayAlertBox(
                            "Failed to register",
                            "Password too short!"
                        );
                    } else if (!matchingPasswords) {
                        displayAlertBox(
                            "Failed to register",
                            "Different passwords!"
                        );
                    } else if (firstName === "") {
                        displayAlertBox(
                            "Failed to register",
                            "First name is empty!"
                        );
                    } else if (secondName === "") {
                        displayAlertBox(
                            "Failed to register",
                            "Second name is empty!"
                        );
                    } else if (yearOfStudy === "") {
                        displayAlertBox(
                            "Failed to register",
                            "Year of study is empty!"
                        );
                    } else {
                        try {
                            register(login, password, {
                                firstName: firstName,
                                lastName: secondName,
                                yearOfStudy: yearOfStudy,
                            });
                        } catch {
                            displayAlertBox(
                                "Failed to register",
                                error.message
                            );
                        }
                        // navigation.push('Main')
                    }
                }}
            ></SignInBtn>
        </SafeAreaView>
    );
};

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        width: "94%",
        flexDirection: "column",
        alignContent: "center",
        marginLeft: Dimensions.get("window").width * 0.05,
    },
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
