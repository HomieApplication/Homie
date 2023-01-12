import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import dotenv from "dotenv";

dotenv.config();

initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
});

const usersTestApp = initializeApp(
    {
        apiKey: process.env.FIREBASE_API_KEY,
    },
    "usersTest"
);

const favsTestApp = initializeApp(
    {
        apiKey: process.env.FIREBASE_API_KEY,
    },
    "favsTest"
);

const myOffersTestApp = initializeApp(
    {
        apiKey: process.env.FIREBASE_API_KEY,
    },
    "myOffersTest"
);

export const auth = getAuth();
export const usersTestAuth = getAuth(usersTestApp);
export const favsTestAuth = getAuth(favsTestApp);
export const myOffersTestAuth = getAuth(myOffersTestApp);

await signInWithEmailAndPassword(
    auth,
    process.env.TEST_USER_EMAIL,
    process.env.TEST_USER_PASSWORD
);

await signInWithEmailAndPassword(
    usersTestAuth,
    process.env.TEST_USER2_EMAIL,
    process.env.TEST_USER_PASSWORD
);

await signInWithEmailAndPassword(
    favsTestAuth,
    process.env.TEST_USER3_EMAIL,
    process.env.TEST_USER_PASSWORD
);

await signInWithEmailAndPassword(
    myOffersTestAuth,
    process.env.TEST_USER4_EMAIL,
    process.env.TEST_USER_PASSWORD
);
