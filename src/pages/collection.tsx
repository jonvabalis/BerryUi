import Box from "@mui/material/Box";
import { useGetByNameBerryType } from "../api/berryTypes/useGetByNameBerryType";
import { BerryType } from "../components/Themes/BerryData";
import PageHeader from "../components/Employee/PageHeader";
import { useGetAllByTypeBerryKind } from "../api/berryKinds/useGetAllByTypeBerryKind";
import { useGetAllEmployees } from "../api/employees/useGetAllEmployees";
import HarvestInputBox from "../components/Harvest/HarvestInputBox";
import { GridContainer } from "../components/Reusable/GridContainer";

export default function collection() {
  const savedBerryType = localStorage.getItem("berryType");
  const berryTypeName = savedBerryType
    ? (JSON.parse(savedBerryType) as BerryType).type
    : "not found";
  const { data: berryTypeData, isLoading } =
    useGetByNameBerryType(berryTypeName);

  const { data: berryKindsData } = useGetAllByTypeBerryKind(berryTypeData?.id, {
    enabled: !!berryTypeData,
  });

  const { data: employeesData } = useGetAllEmployees();
  const currentEmployeeId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

  if (isLoading) {
    return <PageHeader text="Data is being fetched" />;
  }

  if (!berryTypeData) {
    return <PageHeader text="No data is available" />;
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="100px"
      gap={2}
    >
      <GridContainer span={12}>
        <PageHeader text="Harvest input" />
      </GridContainer>
      <HarvestInputBox
        berryTypeData={berryTypeData}
        berryKindsData={berryKindsData}
        employeesData={employeesData}
        defaultEmployeeId={currentEmployeeId}
      />
    </Box>
  );
}
