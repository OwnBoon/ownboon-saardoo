// AppContext.js

import React, { createContext, useState } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <AppContext.Provider value={{ isOpen, openPopup, closePopup }}>
      {children}
    </AppContext.Provider>
  );
};