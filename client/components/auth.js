import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { displayAlertBox } from "./alert";
import { SERVER_URL } from "./firebase/config";

export function isLoggedIn() {
    return getAuth().currentUser;
}

export function register(email, password, userData) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            updateProfile(userCredential.user, {
                displayName: userData.firstName + " " + userData.lastName,
                photoURL: userData.photoURL,
                phoneNumber: userData.phoneNumber,
            }).then(() => {
                fetch(`${SERVER_URL}/api/users/${getAuth().currentUser.uid}`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                }).then((res) => res.json());
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
