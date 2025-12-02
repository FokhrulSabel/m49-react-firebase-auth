import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const singInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

   const signInWithGoogle = () =>{
    setLoading(true);
    return signInWithPopup(auth,googleProvider);
   }

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  //get current user info
  // onAuthStateChanged(auth, (currentUser) => {
  //     if(currentUser) {
  //         console.log('inside observer : if', currentUser)
  //     }
  //     else{
  //         console.log('inside observer : else', currentUser)
  //     }
  // })

  // useEffect(() => {}, [])

  //   useEffect(() => {
  //     // step -1: observer set
  //     // step-2: set in a variable
  //     // step-3: return and call the variable so that you can clear the ref
  //   }, []);

  useEffect(() => {
    // set the observer
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("current user  in auth state change", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    // clear the observer on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    // createUser: createUser
    user,
    loading,
    createUser,
    singInUser,
    signInWithGoogle,
    signOutUser,
    
  };

  return (
    <div>
      <AuthContext value={authInfo}>{children}</AuthContext>
    </div>
  );
};

export default AuthProvider;
