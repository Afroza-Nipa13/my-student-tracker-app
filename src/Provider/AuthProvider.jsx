import React, { useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut,updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import useAxiosSecure from '../hooks/useAxiosSecure';



const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading, setLoading]= useState(true)
    const axiosSecure =useAxiosSecure()
    
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
        setLoading(true)
        return signOut(auth)
    }

    const UpdateProfile =(profileInfo)=>{
        setLoading(false)
        return updateProfile(auth.currentUser, profileInfo);
    }

   // onAuthStateChange
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser)

      if (currentUser) {
        
        try {
          const res = await axiosSecure.post('/jwt', { email: currentUser.email })
          console.log('JWT set in cookie:', res.data)
        } catch (err) {
          console.error('JWT error:', err)
        }
      } else {
        
        try {
          await axiosSecure.get('/logout')
          console.log('Token cleared')
        } catch (err) {
          console.error('Logout error:', err)
        }
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [axiosSecure])
    const authInfo={
        user,
    setUser,
    loading,
    setLoading,
    createUser,
    LogOut,
    signInWithGoogle,
    signInUser,
    UpdateProfile,
    }
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
};

export default AuthProvider;