// src/contexts/GsapContext.jsx
import React, { createContext, useContext } from "react";
import { gsap } from "gsap";

const GsapContext = createContext(null);

export const GsapProvider = ({ children }) => {
  return (
    <GsapContext.Provider value={gsap}>
      {children}
    </GsapContext.Provider>
  );
};

export const useGsap = () => {
  const context = useContext(GsapContext);
  if (!context) {
    console.error("[useGsap] GSAP instance not available from context!");
  }
  return context;
};
