import React, { createContext, useEffect, useState } from 'react';
import { app } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword, updateProfile } from "firebase/auth"


export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const UserContext = ({ children }) => {
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

    //email verification
    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser);
    }

    // log out
    const logOut = () => {
        // setLoading(true);
        localStorage.removeItem("token");
        return signOut(auth);
    };


    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    }

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
        verifyEmail
    }

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;