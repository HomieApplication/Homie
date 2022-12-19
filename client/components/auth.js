import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import axios from "axios";

import { displayAlertBox } from "./alert";
import { SERVER_URL } from "./firebase/config";

export function isLoggedIn() {
    return getAuth().currentUser;
}

export function register(email, password, userData) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            axios.post("/api/users", userData).catch((error) => {
                displayAlertBox("Failed to register", error.message);
            });
        })
        .catch((error) => {
            displayAlertBox("Failed to register", error.message);
        });
    return auth.currentUser;
}

export function login(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(`Successfully logged in!`);
        })
        .catch((error) => {
            displayAlertBox("Failed to sign in", error.message);
        });
    return auth.currentUser;
}

export function logout() {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            console.log(`Successfully logged out!`);
        })
        .catch((error) => {
            displayAlertBox("Failed to sign out", error.message);
        });
}
