// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyCXb7Mnc4rE79aQJKy_bbMRmvvfDjyuXMI",
  authDomain: "cityzens-7c934.firebaseapp.com",
  projectId: "cityzens-7c934",
  storageBucket: "cityzens-7c934.appspot.com",
  messagingSenderId: "743641328206",
  appId: "1:743641328206:web:3346c1d3ff228f7b26b11f"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);