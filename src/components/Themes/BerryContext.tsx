import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  BERRY_THEME,
  BerryTheme,
  BerryType,
  defaultBerryType,
} from "./BerryData";
import { toast } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";
import { useGetByNameBerryType } from "../../api/berryTypes/useGetByNameBerryType";
import { useAuth } from "../../providers/AuthProvider";

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
  const { isAuthenticated } = useAuth();
  const savedBerryType = useMemo(() => {
    const item = localStorage.getItem("berryType");
    return item ? (JSON.parse(item) as BerryType) : null;
  }, []);
  const { data } = useGetByNameBerryType(defaultBerryType, {
    enabled: !savedBerryType && isAuthenticated,
  });
  const [berryTheme, setBerryThemeState] = useState<BerryTheme>(() => {
    return savedBerryType
      ? BERRY_THEME[savedBerryType.name]
      : BERRY_THEME[defaultBerryType];
  });

  useEffect(() => {
    const savedBerryType = localStorage.getItem("berryType");

    if (!savedBerryType && data) {
      localStorage.setItem("berryType", JSON.stringify(data));
      setBerryThemeState(BERRY_THEME[data.name]);
    }
  }, [data, isAuthenticated]);

  const setBerryTheme = (berryType: BerryType) => {
    localStorage.setItem("berryType", JSON.stringify(berryType));
    setBerryThemeState(
      BERRY_THEME[berryType.name] || BERRY_THEME[defaultBerryType]
    );
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
