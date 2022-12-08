import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

import MainScreen from "./screens/MainScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import UserProfile from "./screens/UserProfile";
import AddOfferScreen from "./screens/AddOfferScreen";

import { isLoggedIn, logout, login, register } from "./components/auth";
import { auth, SERVER_URL } from "./components/firebase/config";

// App.js jest jak main - tutaj ma być mało kodu
// głównie nawigacja - react-navigation

// w ./screens - całe strony - profil / logowanie / strona główna
// w ./components/[nazwa strony] - komponenty które budują daną strone np.: opis / karta/ nagłówek itd

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreAllLogs();

axios.interceptors.request.use(
    async (config) => {
        config.baseURL = SERVER_URL;
        await getAuth()
            .currentUser?.getIdToken()
            .then((idToken) => {
                config.headers.authorization = `Bearer ${idToken}`;
            });
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

function Main() {
    return (
        <Tab.Navigator
            initialRouteName="MainScreen"
            screenOptions={{
                tabBarActiveTintColor: "#114B5F",
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={MainScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={35}
                        />
                    ),
                    tabBarShowLabel: false,
                }}
            />
            <Tab.Screen
                name="AddOffer"
                component={AddOfferScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="plus-box"
                            color={color}
                            size={50}
                        />
                    ),
                    tabBarShowLabel: false,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={UserProfile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="account"
                            color={color}
                            size={35}
                        />
                    ),
                    tabBarShowLabel: false,
                }}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    const [user, setUser] = React.useState(isLoggedIn());

    onAuthStateChanged(auth, (user) => {
        setUser(user);
    });

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {!user ? (
                        <Stack.Group>
                            <Stack.Screen
                                name="SignIn"
                                component={SignInScreen}
                            />
                            <Stack.Screen
                                name="SignUp"
                                component={SignUpScreen}
                            />
                        </Stack.Group>
                    ) : (
                        <Stack.Group>
                            <Stack.Screen name="Main" component={Main} />
                            <Stack.Screen
                                name="AddOffer"
                                component={AddOfferScreen}
                            />
                            <Stack.Screen
                                name="Profile"
                                component={UserProfile}
                            />
                        </Stack.Group>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
