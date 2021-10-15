import {auth , firestore } from "./firebase";
import { createContext, useEffect, useState } from "react";

export const authContext=createContext();

let AuthProvider=(props)=>{
    let [user,setUser]=useState(null);
    let [loading,setLoading]=useState(true);

    useEffect(()=>{
        let unSub=auth.onAuthStateChanged(async (user)=>{
            if(user){
                let {displayName, email, photoURL, uid}=user;
                let docRef=firestore.collection("users").doc(uid);
                let documentSnapshot= await docRef.get();
                if(!documentSnapshot.exists){
                    docRef.set({displayName,email,photoURL});
                }
                setUser({displayName, email, photoURL, uid});

            }else{
                setUser(null);
            }
            setLoading(false);
        });
        return ()=>{
            unSub();
        };
    },[]);
    return (
    <authContext.Provider value={user}>
        {!loading && props.children}
    </authContext.Provider>);

}
export default AuthProvider;