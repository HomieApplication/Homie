import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";

export function isLoggedIn() {
    return getAuth().currentUser;
}

export function register(email, password, userData) {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
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
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(`Successfully logged out!`);
            // ...
        })
        .catch((error) => {
            console.log(`Login error: ${error.message}`);
        });
}

export function logout() {
    const auth = getAuth()
    signOut(auth)
        .then(() => {
            console.log(`Successfully logged out!`);
            // ...
        })
        .catch((error) => {
            console.log(`Signout error: ${error.message}`);
        });
}
