import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  //   Provider
  const google_provider = new GoogleAuthProvider();

  console.log(user);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);

      if (currentUser) {
        axiosPublic.post("/jwt", loggedUser, {
          withCredentials: true,
        });
      } else {
        axiosPublic.post("/logout", loggedUser, {
          withCredentials: true,
        });
      }
      const userData = {
        name: currentUser?.displayName,
        email: currentUser?.email,
        email_verified: currentUser?.emailVerified,
        role: "user",
        profile_pic: currentUser?.photoURL,
      };
      // console.log(currentUser);
      if (currentUser !== null && currentUser?.displayName) {
        axiosSecure.put(`/users/${currentUser?.email}`, userData);
      }
      setAuthLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [axiosPublic, axiosSecure, user?.email]);

  const createUserWithEmail = (email, password) => {
    setAuthLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const signInWithEmail = (email, password) => {
    setAuthLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const contineWithGoogle = () => {
    setAuthLoading(true);
    return signInWithPopup(auth, google_provider);
  };

  const logOutUser = () => {
    return signOut(auth).then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logout successfully done",
        showConfirmButton: false,
        timer: 2500,
      });
    });
  };

  const authInfo = {
    user,
    authLoading,
    createUserWithEmail,
    signInWithEmail,
    contineWithGoogle,
    updateUserProfile,
    logOutUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
