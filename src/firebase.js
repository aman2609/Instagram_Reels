import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDAtBZT_MXnncCaKRSo0ZIpqPW6cIJls6Q",
    authDomain: "reels-84912.firebaseapp.com",
    projectId: "reels-84912",
    storageBucket: "reels-84912.appspot.com",
    messagingSenderId: "298003626286",
    appId: "1:298003626286:web:cee24054b122f1c60722bf"
};
firebase.initializeApp(firebaseConfig);
export default firebase;