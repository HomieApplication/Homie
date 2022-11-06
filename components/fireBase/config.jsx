// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS3wIOqcNXDjv4VaTpdIdCQvx89GI6e0s",
  authDomain: "homie-f055d.firebaseapp.com",
  databaseURL: "https://homie-f055d-default-rtdb.firebaseio.com",
  projectId: "homie-f055d",
  storageBucket: "homie-f055d.appspot.com",
  messagingSenderId: "812563857362",
  appId: "1:812563857362:web:a0916ca9b751a7d4a6d20b",
  measurementId: "G-ZTJQ1PJKN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);
