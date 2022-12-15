import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import dotenv from "dotenv";

dotenv.config();

initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
});

export const auth = getAuth();

await signInWithEmailAndPassword(
    auth,
    process.env.TEST_USER_EMAIL,
    process.env.TEST_USER_PASSWORD
);
