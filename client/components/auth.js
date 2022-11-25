// import auth from "@react-native-firebase/auth";
import { getAuth } from "firebase/auth";

export function isLoggedIn() {
    return getAuth();
}

export function register(email, password, userData) {
    getAuth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            updateProfile(userCredential.user, {
                displayName: userData.firstName + " " + userData.lastName,
                photoURL: userData.photoURL,
                phoneNumber: userData.phoneNumber,
            });
            // ...
        })
        .catch((error) => {
            console.log(`Register error: ${error.message}`);
        });
}

export function login(email, password) {
    getAuth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log(`Successfully logged out!`);
            // ...
        })
        .catch((error) => {
            console.log(`Login error: ${error.message}`);
        });
}

export function logout() {
    getAuth()
        .signOut()
        .then(() => {
            console.log(`Successfully logged out!`);
            // ...
        })
        .catch((error) => {
            console.log(`Signout error: ${error.message}`);
        });
}
