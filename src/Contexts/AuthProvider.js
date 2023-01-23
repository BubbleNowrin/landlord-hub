import React, { createContext, useEffect, useState } from 'react';
import { app } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //create user method implementation
    // const createUser = (email, password) => {
    //     setLoading(true);
    //     return createUserWithEmailAndPassword(auth, email, password);
    // }

    //user sign in method implementation
    // const signIn = (email, password) => {
    //     setLoading(true);
    //     return signInWithEmailAndPassword(auth, email, password);
    // }

    //logout implementation
    // const logOut = () => {
    //     setLoading(true);
    //     localStorage.removeItem('Token');
    //     return signOut(auth);
    // }

    //google login implementation
    // const googleLogin = (googleProvider) => {
    //     setLoading(true);
    //     return signInWithPopup(auth, googleProvider);
    // }

    //user profile update implementation method
    // const updateUserProfile = (profile) => {
    //     return updateProfile(auth.currentUser, profile);
    // }

    //observer
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    //         setLoading(false);
    //     })

    //     return () => unsubscribe();
    // }, [])

    const authInfo = {
        user,
        // createUser,
        // signIn,
        // logOut,
        // googleLogin,
        // updateUserProfile,
        // loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;