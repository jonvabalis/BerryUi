import Box from "@mui/material/Box";
import { BerryType } from "../components/Themes/BerryData";
import PageHeader from "../components/Reusable/PageHeader";
import SaleInputBox from "../components/Sale/SaleInputBox";
import { useGetAllByTypeBerryKind } from "../api/berryKinds/useGetAllByTypeBerryKind";

export default function sale() {
  const savedBerryType = localStorage.getItem("berryType");
  const berryTypeData = JSON.parse(savedBerryType!) as BerryType;

  const { data: berryKindsData } = useGetAllByTypeBerryKind(berryTypeData.id);
  const defaultBerryCost = "6";
  const employeeId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Sale input" />
      </Box>
      <SaleInputBox
        berryTypeData={berryTypeData}
        berryKindsData={berryKindsData}
        defaultBerryCost={defaultBerryCost}
        employeeId={employeeId}
      />
    </Box>
  );
}
