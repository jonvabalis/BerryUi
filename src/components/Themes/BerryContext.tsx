import React, { createContext, useContext, useState } from "react";
import { BERRY_THEME, BerryTheme, BerryType } from "./BerryData";
import { toast } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";

interface BerryContextTheme {
  berryTheme: BerryTheme;
  setBerryTheme: (type: BerryType) => void;
}

const BerryContext = createContext<BerryContextTheme>({
  berryTheme: BERRY_THEME[0],
  setBerryTheme: () => {},
});

export const BerryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [berryTheme, setBerryTypeState] = useState<BerryTheme>(() => {
    const savedBerryType = localStorage.getItem("berryType");
    if (savedBerryType) {
      return BERRY_THEME[(JSON.parse(savedBerryType) as BerryType).id];
    }
    return BERRY_THEME[0];
  });

  const setBerryTheme = (type: BerryType) => {
    localStorage.setItem("berryType", JSON.stringify(type));
    setBerryTypeState(BERRY_THEME[type.id]);
  };

  return (
    <BerryContext.Provider value={{ berryTheme, setBerryTheme }}>
      <ThemeProvider theme={berryTheme.theme}>{children}</ThemeProvider>
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
