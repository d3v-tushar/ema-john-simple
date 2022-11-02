import React, { createContext, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import app from '../../components/firebase/firebase.config';
import { useEffect } from 'react';


export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    //Create User Wih Email & Password
    const signUp = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    //Login Existing User
    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };

    //Logout User
    const logOut = () =>{
        setLoading(true);
        return signOut(auth)
    };

    //Get Currently Signed in user
    useEffect( () =>{
        const unSubscribe = onAuthStateChanged( auth, currentUser =>{
            console.log('current User inside state change', currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () => unSubscribe();

    }, [])


    const authinfo = {user, loading, signUp, signIn, logOut};
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;