import { Theme } from "@mui/material/styles";
import { blueberryTheme, strawberryTheme } from "./BerryThemeDefinitions";

export interface BerryType {
  id: string;
  name: string;
}

export interface BerryTheme {
  id: number;
  theme: Theme;
}

export const BERRY_THEME: Record<string, BerryTheme> = {
  Blueberry: {
    id: 0,
    theme: blueberryTheme,
  },
  Strawberry: {
    id: 1,
    theme: strawberryTheme,
  },
};

export const defaultBerryType = "Blueberry";
