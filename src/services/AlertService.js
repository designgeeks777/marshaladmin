import React, { useState, createContext } from "react";

export const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const setAlert = (alertMsg) => {
    setShowAlert({
      isOpen: alertMsg.isOpen,
      type: alertMsg.type,
      message: alertMsg.message,
    });
    setTimeout(() => {
      setShowAlert({
        isOpen: "",
        type: "",
        message: "",
      });
    }, 2000);
  };
  return (
    <AlertContext.Provider value={{ showAlert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
