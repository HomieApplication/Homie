import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
    User,
} from "firebase/auth";
import axios from "axios";
import { auth } from "./firebase/config";

import { displayAlertBox } from "../components/alert";

/**
 * @returns {User|null} Current user if user logged in, otherwise null
 */
export function isLoggedIn() {
    return getAuth().currentUser;
}

/**
 * Creates a new user with email and password and signs them in.
 * creates a new user in the database,
 * and sends an email verification. ?? TODO
 * @param {string} email
 * @param {string} password
 * @param {Object} userData - user data to be stored in the database
 * @returns {User} new User
 */
export function register(email, password, userData) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            axios
                .post("/api/users", userData)
                .then(() => emailVerification())
                .catch((error) => {
                    displayAlertBox("Failed to register", error.message);
                });
        })
        .catch((error) => {
            displayAlertBox("Failed to register", error.message);
        });

    return auth.currentUser;
}

/**
 * Signs in a user with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {User} signed in user
 */
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

/**
 * Signs out the current user.
 */
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

/**
 * Sends an email verification to the current user.
 */
function emailVerification() {
    const auth = getAuth();
    auth.useDeviceLanguage();
    sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log(`Email verification sent!`);
        })
        .catch((error) => {
            console.log("Failed to sent verification mail. " + error.message);
        });
    // user.emailVerified
}

/**
 * Sends a password reset email to the given email address.
 * @param {string} email
 */
export function resetPassword(email) {
    const auth = getAuth();
    auth.useDeviceLanguage();
    sendPasswordResetEmail(auth, email)
        .then(() => {
            displayAlertBox("Password reset email sent", email);
        })
        .catch((error) => {
            displayAlertBox(
                "Failed to reset password",
                "Check your email address"
            );
        });
}

/**
 * Deletes currently logged in user
 */
export function deleteCurrentUser() {
    const auth = getAuth();
    // TODO: delete user from database and profile picture
    deleteUser(auth.currentUser)
        .then(() => {
            console.log(`Successfully deleted user!`);
        })
        .catch((error) => {
            displayAlertBox("Failed to delete user", error.message);
        });
}
