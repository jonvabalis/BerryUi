import { Theme } from "@mui/material/styles";
import { blueberryTheme, strawberryTheme } from "./BerryThemeDefinitions";

export interface BerryType {
  id: number;
  type: string;
  theme: Theme;
}

export const BERRY_TYPE: BerryType[] = [
  {
    id: 0,
    type: "Blueberry",
    theme: blueberryTheme,
  },
  {
    id: 1,
    type: "Strawberry",
    theme: strawberryTheme,
  },
];
