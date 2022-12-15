import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

initializeApp({
    credential: cert(serviceAccount),
});

export const db = getFirestore();
export const auth = getAuth();
