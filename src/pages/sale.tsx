import Box from "@mui/material/Box";
import { useGetByNameBerryType } from "../api/berryTypes/useGetByNameBerryType";
import { BerryType } from "../components/Themes/BerryData";
import SaleInputBar from "../components/Sale/SaleInputBar";

export default function sale() {
  const savedBerryType = localStorage.getItem("berryType");
  const berryTypeName = savedBerryType
    ? (JSON.parse(savedBerryType) as BerryType).type
    : "not found";
  const { data, isLoading } = useGetByNameBerryType(berryTypeName);

  if (isLoading) {
    return (
      <Box sx={{ color: "primary.contrastText" }}>Data is being fetched</Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ color: "primary.contrastText" }}>No data is available</Box>
    );
  }

  return <SaleInputBar data={data} />;
}
