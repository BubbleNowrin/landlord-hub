import React, { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,

    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updatePassword,
    updateProfile,
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";

// Create Context
export const AuthContext = createContext();

// get auth from firebase
const auth = getAuth(app);

// google and twitter provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    // user
    const [user, setUser] = useState("");
    // loader
    const [loading, setLoading] = useState(true);
    // theme
    const [theme, setTheme] = useState("light");
    // users
    // const [users, setUsers] = useState([]);
    // logged in user
    // const [loggedUser, setLoggedUser] = useState({});

    // user inspection
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe;
    }, []);


    // create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // login user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // google logIn
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };


    // updateUser
    const updateUser = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image,
        });
    };

    // forget password
    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // update password
    const newPassword = (password) => {
        return updatePassword(auth.currentUser, password);
    };

    // log out
    const logOut = () => {
        // setLoading(true);
        localStorage.removeItem("token");
        return signOut(auth);
    };
    // value wrapper
    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        googleLogin,
        updateUser,
        logOut,
        theme,
        setTheme,
        setLoading,
        forgetPassword,
        newPassword,
    };
    return (
        <div>
            <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;