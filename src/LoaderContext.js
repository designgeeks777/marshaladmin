import React, { useState, createContext } from "react";

export const LoaderContext = createContext();

export const LoaderContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};
