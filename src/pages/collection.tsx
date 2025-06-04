import Box from "@mui/material/Box";
import PageHeader from "../components/Reusable/PageHeader";
import { useGetAllByTypeBerryKind } from "../api/berryKinds/useGetAllByTypeBerryKind";
import { useGetAllEmployees } from "../api/employees/useGetAllEmployees";
import HarvestInputBox from "../components/Harvest/HarvestInputBox";
import { getBerryType } from "../utils/berryTypeHelper";
import { useMemo } from "react";

export default function collection() {
  const berryTypeData = useMemo(() => getBerryType(), []);

  const { data: berryKindsData } = useGetAllByTypeBerryKind(berryTypeData.id);
  const { data: employeesData } = useGetAllEmployees();
  const currentEmployeeId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

  if (!berryTypeData) {
    return <PageHeader text="No data is available" />;
  }

  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Harvest input" />
      </Box>
      <HarvestInputBox
        berryTypeData={berryTypeData}
        berryKindsData={berryKindsData}
        employeesData={employeesData}
        defaultEmployeeId={currentEmployeeId}
      />
    </Box>
  );
}
