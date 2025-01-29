import Box from "@mui/material/Box";
import { useGetByNameBerryType } from "../api/berryTypes/useGetByNameBerryType";
import { BerryType } from "../components/Themes/BerryData";
import SaleInputBar from "../components/Sale/SaleInputBar";
import PageHeader from "../components/Employee/PageHeader";
import SaleInputBox from "../components/Sale/SaleInputBox";

export default function sale() {
  const defaultBerryCost = "6";
  const employeeId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  const savedBerryType = localStorage.getItem("berryType");
  const berryTypeName = savedBerryType
    ? (JSON.parse(savedBerryType) as BerryType).type
    : "not found";
  const { data: berryTypeData, isLoading } =
    useGetByNameBerryType(berryTypeName);

  if (isLoading) {
    return (
      <Box sx={{ color: "primary.contrastText" }}>Data is being fetched</Box>
    );
  }

  if (!berryTypeData) {
    return (
      <Box sx={{ color: "primary.contrastText" }}>No data is available</Box>
    );
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="100px"
      gap={2}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="flex-start"
        gridColumn="span 12"
      >
        <PageHeader text="Sale input" />
      </Box>
      <SaleInputBox
        berryTypeData={berryTypeData}
        defaultBerryCost={defaultBerryCost}
        employeeId={employeeId}
      />
    </Box>
  );
}
