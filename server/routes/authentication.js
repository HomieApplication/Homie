import { doc, setDoc } from "firebase/firestore";
import express from "express";
import { db } from "../firebase/config.js";
import {
    getAuth,
    updateProfile,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

const router = express.Router();

router.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Tworzy nowego użytkownika
    createUserWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential) => {
            const userData = {
                userId: userCredential.user.uid,
                age: req.body.age,
                description: req.body.description || "No description",
                yearOfStudy: req.body.yearOfStudy || "Not a student",
                photoURL: req.body.photoURL || "No photo",
                myOffers: [],
                favs: [],
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender || "Unknown",
                phoneNumber: req.body.phoneNumber || "No phone number",
            };

            updateProfile(userCredential.user, {
                displayName: userData.firstName + " " + userData.lastName,
                photoURL: userData.photoURL,
                phoneNumber: userData.phoneNumber,
            })

            const newUser = doc(db, "users", userCredential.user.uid);

            setDoc(newUser, userData).then(() => {
                res.send(userData);
            });
        })
        .catch((error) => {
            res.status(500).send({
                errorCode: error.code,
                message: error.message,
            });
        });
});

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // weryfikacja loginu i hasła
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            res.send(userCredential.user.uid);
        })
        .catch((error) => {
            res.status(500).send({
                errorCode: error.code,
                message: error.message,
            });
        });
});

// wylogowuje obecnie zalogowanego użytkownika
router.get("/logout", (req, res) => {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            res.send(`Successfully logged out!`);
        })
        .catch((error) => {
            res.status(500).send({
                errorCode: error.code,
                message: error.message,
            });
        });
});

export default router;
