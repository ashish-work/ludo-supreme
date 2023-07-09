// Import the functions you need from the SDKs you need
import { initializeApp } from "@react-native-firebase/app";
import { getAuth } from "@react-native-firebase/auth";
import { getDatabase } from "@react-native-firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA93m8xeZgTj2EA4VmSDmaySMDINHyTZSY",
  authDomain: "ludosupreme-2497f.firebaseapp.com",
  databaseURL: "https://ludosupreme-2497f-default-rtdb.firebaseio.com",
  projectId: "ludosupreme-2497f",
  storageBucket: "ludosupreme-2497f.appspot.com",
  messagingSenderId: "797331306903",
  appId: "1:797331306903:web:f486f2bd50a26d1380ecd2",
  measurementId: "G-SL378Y2WJ1"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);