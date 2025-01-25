import React, { createContext, useContext, useState } from "react";
import { BERRY_TYPE, BerryType } from "./BerryData";
import { toast } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";

interface BerryContextType {
  berryType: BerryType;
  setBerryType: (type: BerryType) => void;
}

const BerryContext = createContext<BerryContextType>({
  berryType: BERRY_TYPE[0],
  setBerryType: () => {},
});

export const BerryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [berryType, setBerryTypeState] = useState<BerryType>(() => {
    const savedBerryType = localStorage.getItem("berryType");
    if (savedBerryType) {
      return JSON.parse(savedBerryType) as BerryType;
    }
    return BERRY_TYPE[0];
  });

  const setBerryType = (type: BerryType) => {
    localStorage.setItem("berryType", JSON.stringify(type));
    console.log(JSON.stringify(type));
    console.log(type);
    setBerryTypeState(type);
  };

  //const [berryType, setBerryType] = useState(() => BERRY_TYPE[0]);

  return (
    <BerryContext.Provider value={{ berryType, setBerryType }}>
      <ThemeProvider theme={berryType.theme}>{children}</ThemeProvider>
    </BerryContext.Provider>
  );
};

export const useBerryContext = () => {
  const context = useContext(BerryContext);
  if (!context) {
    toast.error("useBerryContext must be used within a BerryProvider");
  }
  return context;
};
