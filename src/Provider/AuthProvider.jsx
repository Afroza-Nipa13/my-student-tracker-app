import React, { useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';



const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading, setLoading]= useState(true)
    
    const createUser =(email, password)=>{
        setLoading(false)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser= (email, password)=>{
        setLoading(false)
        return signInWithEmailAndPassword(auth,email, password)
    }
    const signInWithGoogle=()=>{
        setLoading(false)
        return signInWithPopup(auth,googleProvider)
    }

    const LogOut =async()=>{
        setLoading(false)
        return signOut()
    }

    const UpdateProfile =(profileInfo)=>{
        setLoading(false)
        return updateProfile(auth.currentUser, profileInfo);
    }

    // onAuthStateChange

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth, async currentUser =>{
            setUser(currentUser)


             setLoading(false)
        })

        return ()=>unsubscribe()
    },[])

    const authInfo={
        user,
    setUser,
    loading,
    setLoading,
    createUser,
    LogOut,
    signInWithGoogle,
    signInUser,
    updateProfile,
    }
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
};

export default AuthProvider;