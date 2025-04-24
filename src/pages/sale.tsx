import Box from "@mui/material/Box";
import { useGetByNameBerryType } from "../api/berryTypes/useGetByNameBerryType";
import { BerryType } from "../components/Themes/BerryData";
import PageHeader from "../components/Reusable/PageHeader";
import SaleInputBox from "../components/Sale/SaleInputBox";
import { useGetAllByTypeBerryKind } from "../api/berryKinds/useGetAllByTypeBerryKind";

export default function sale() {
  const savedBerryType = localStorage.getItem("berryType");
  const berryTypeName = savedBerryType
    ? (JSON.parse(savedBerryType) as BerryType).type
    : "not found";
  const { data: berryTypeData, isLoading } =
    useGetByNameBerryType(berryTypeName);

  const { data: berryKindsData } = useGetAllByTypeBerryKind(berryTypeData?.id, {
    enabled: !!berryTypeData,
  });
  const defaultBerryCost = "6";
  const employeeId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

  if (isLoading) {
    return <PageHeader text="Data is being fetched" />;
  }

  if (!berryTypeData) {
    return <PageHeader text="No data is available" />;
  }

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
