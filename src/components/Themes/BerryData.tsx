import { Theme } from "@mui/material/styles";
import { blueberryTheme, strawberryTheme } from "./BerryThemeDefinitions";

export interface BerryType {
  id: number;
  type: string;
}

export const BERRY_TYPE: BerryType[] = [
  {
    id: 0,
    type: "Blueberry",
  },
  {
    id: 1,
    type: "Strawberry",
  },
];

export interface BerryTheme {
  id: number;
  theme: Theme;
}

export const BERRY_THEME: BerryTheme[] = [
  {
    id: 0,
    theme: blueberryTheme,
  },
  {
    id: 1,
    theme: strawberryTheme,
  },
];
