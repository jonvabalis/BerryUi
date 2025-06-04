import { BerryType } from "../components/Themes/BerryData";

export function getBerryType(): BerryType {
  const savedBerryType = localStorage.getItem("berryType");

  return JSON.parse(savedBerryType!) as BerryType;
}
