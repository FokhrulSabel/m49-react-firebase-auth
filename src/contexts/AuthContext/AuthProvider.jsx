import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const singInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

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
    createUser,
    singInUser,
    signOutUser,
  };

  return (
    <div>
      <AuthContext value={authInfo}>{children}</AuthContext>
    </div>
  );
};

export default AuthProvider;
