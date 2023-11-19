import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/Firebase';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const SharedData = createContext();

const auth = getAuth(app);

const SharedContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [navbarMiniWindow, setNavbarMiniWindow] = useState(false);
    const [coverPhotoOptionIcon, setCoverPhotoOptionIcon] = useState(false);
    const googleProvider = new GoogleAuthProvider();

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const createAccount = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const Login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const Logout = () => {
        setLoading(true);
        setNavbarMiniWindow(!navbarMiniWindow);
        localStorage.removeItem('token');
        return signOut(auth);
    }

    const handleNavMiniWindow = () => {
        setNavbarMiniWindow(!navbarMiniWindow);
        return navbarMiniWindow;
    }

    const handleCoverPhotoOption= ()=>{
        setCoverPhotoOptionIcon(!coverPhotoOptionIcon);
        return coverPhotoOptionIcon;
    }

    useEffect(() => {
        const check = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => check();
    })

    const authInfo = { googleLogin, Login, loading, user, createAccount, Logout, setLoading, setUser, handleNavMiniWindow, navbarMiniWindow, handleCoverPhotoOption, coverPhotoOptionIcon };
    return (
        <div>
            <SharedData.Provider value={authInfo}>
                {children}
            </SharedData.Provider>
        </div>
    );
};

export default SharedContext;