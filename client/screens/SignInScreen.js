import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Dimensions,
    Alert,
    TouchableOpacity,
} from "react-native";
import SignInBtn from "../components/signIn/SignInBtn";
import { SafeAreaView } from "react-native-safe-area-context";

import { login, resetPassword } from "../components/auth";
import { displayAlertBox } from "../components/alert";

const SignInScreen = ({ navigation }) => {
    const [email, onChangeLogin] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [correctPassword, setCorrectPassword] = React.useState(true);
    const [correctEmail, setCorrectEmail] = React.useState(true);

    React.useEffect(() => {
        if (password.length < 6 && password.length > 0) {
            setCorrectPassword(false);
        } else {
            setCorrectPassword(true);
        }
    }, [password]);

    React.useEffect(() => {
        if (!validateEmail(email) && email.length > 0) {
            setCorrectEmail(false);
        } else {
            setCorrectEmail(true);
        }
    }, [email]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    source={require("../assets/Logo.png")}
                    style={styles.img}
                ></Image>
            </View>
            <View style={styles.signInCard}>
                <Text style={styles.h2}>Sign In</Text>
                <TextInput
                    style={styles.textboxes}
                    onChangeText={onChangeLogin}
                    value={email}
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
                <SignInBtn
                    style={styles.button}
                    title="Confirm"
                    onPress={() => {
                        if (!correctEmail || login === "") {
                            displayAlertBox(
                                "Failed to sign in",
                                "Invalid email!"
                            );
                        } else if (!correctPassword || password === "") {
                            displayAlertBox(
                                "Failed to sign in",
                                "Password too short!"
                            );
                        } else {
                            try {
                                login(email, password);
                                // navigation.push("Main");
                            } catch (error) {
                                displayAlertBox(
                                    "Failed to sign in",
                                    "Invalid email or password!"
                                );
                            }
                        }
                    }}
                ></SignInBtn>
            </View>
            <View style={styles.BottomContainer}>
                <TouchableOpacity>
                    <Text
                        style={styles.register}
                        onPress={() => {
                            navigation.push("SignUp");
                        }}
                    >
                        Register here
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text
                        style={styles.register}
                        onPress={() => resetPassword(email)}
                    >
                        Forgot password
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

/**
 * Checks if the email is valid
 * @param {string} email
 * @returns {boolean} true if valid, false otherwise
 */
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#114B5F",
        alignItems: "center",
        justifyContent: "center",
    },
    headerContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "40%",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    h1: {
        fontSize: 70,
        marginVertical: 5,
        color: "#fff",
    },
    img: {
        height: "90%",
        aspectRatio: 1,
    },
    signInCard: {
        height: Dimensions.get("window").height * 0.4,
        width: "90%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
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
        margin: 10,
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
    register: {
        position: "relative",
        color: "white",
        top: 10,
    },
    h2: {
        fontSize: 30,
        marginVertical: 5,
        color: "#1A936F",
    },
    BottomContainer: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
});
