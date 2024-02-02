import React, { useState, createContext, useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import {
  getRedirectResult,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import ComponentModal from "../components/ComponentModal";
import { gmailid } from "../APIKey";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setISAuthenticating] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (usr) => {
      const isPageReloaded =
        window.performance.navigation.type ===
        window.performance.navigation.TYPE_RELOAD;
      if (usr) {
        setIsLoading(true);
        if (usr.email === gmailid) {
          const { displayName, email, photoURL, metadata } = usr;
          let lastSignInTime = metadata.lastSignInTime;
          let splitName = displayName.split(/\s+/);
          let firstName = splitName[0];
          let lastName = splitName[1];
          let modifiedUser = {
            firstName,
            lastName,
            email,
            photoURL,
            lastSignInTime,
          };
          setUser(modifiedUser);
          setIsLoading(false);
          setISAuthenticating(false);
          console.log("signed in", usr?.email, isLoading, isAuthenticating);
        } else {
          setUser(null);
          setIsLoading(false);
          setISAuthenticating(false);
          if (!isPageReloaded) {
            setToastMessage("You are not authorized to login");
            setTimeout(() => {
              setToastMessage(null);
            }, 2000);
          }
          console.log("not signed in", usr?.email, isLoading, isAuthenticating);
        }
      } else {
        setUser(null);
        setIsLoading(false);
        setISAuthenticating(false);
        console.log(
          "otuside else not signed in",
          usr?.email,
          isLoading,
          isAuthenticating
        );
      }
    });
  }, []);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    setISAuthenticating(true);
    try {
      await signInWithRedirect(auth, googleProvider);
      const result = await getRedirectResult(auth);
      setIsLoading(true);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const logOut = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirmed = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setIsLoading(false);
      setUser(null);
      setIsLogoutModalOpen(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleLogoutCancelled = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticating,
        toastMessage,
        signInWithGoogle,
        logOut,
      }}
    >
      <ComponentModal
        show={isLogoutModalOpen}
        toggle={handleLogoutCancelled}
        title=""
        submitButtonTitle="Yes"
        submitButtonClick={handleLogoutConfirmed}
        cancelButtonTitle="No"
        cancelButtonClick={handleLogoutCancelled}
      >
        <h5 className="text-center">Are you sure you want to logout?</h5>
      </ComponentModal>
      {children}
    </AuthenticationContext.Provider>
  );
};
