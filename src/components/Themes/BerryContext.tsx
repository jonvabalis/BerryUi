import React, { createContext, useContext, useEffect, useState } from "react";
import {
  BERRY_THEME,
  BerryTheme,
  BerryType,
  defaultBerryType,
} from "./BerryData";
import { toast } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";
import { useGetByNameBerryType } from "../../api/berryTypes/useGetByNameBerryType";

interface BerryContextTheme {
  berryTheme: BerryTheme;
  setBerryTheme: (type: BerryType) => void;
}

const BerryContext = createContext<BerryContextTheme>({
  berryTheme: BERRY_THEME[defaultBerryType],
  setBerryTheme: () => {},
});

export const BerryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data } = useGetByNameBerryType(defaultBerryType);
  const [berryTheme, setBerryTypeState] = useState<BerryTheme>(() => {
    const savedBerryType = localStorage.getItem("berryType");
    if (savedBerryType) {
      const berryType = JSON.parse(savedBerryType!) as BerryType;
      return BERRY_THEME[berryType.name];
    }

    if (data) {
      localStorage.setItem("berryType", JSON.stringify(data));
      return BERRY_THEME[data.name];
    }

    return BERRY_THEME[defaultBerryType];
  });

  useEffect(() => {
    const savedBerryType = localStorage.getItem("berryType");

    if (!savedBerryType && data) {
      localStorage.setItem("berryType", JSON.stringify(data));
      setBerryTypeState(BERRY_THEME[data.name]);
    }
  }, [data]);

  const setBerryTheme = (berryType: BerryType) => {
    localStorage.setItem("berryType", JSON.stringify(berryType));
    setBerryTypeState(BERRY_THEME[berryType.name]);
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
