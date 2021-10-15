import firebase from "firebase/compat//app";
import "firebase/compat//auth";
import config from "./config.json";
import "firebase/compat//firestore";

firebase.initializeApp(config);
let provider=new firebase.auth.GoogleAuthProvider();
export const auth=firebase.auth();
export const firestore=firebase.firestore();
export const signInWithGoogle=()=>{
    auth.signInWithPopup(provider);
}
export default firebase;