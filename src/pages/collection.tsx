import Box from "@mui/material/Box";
import PageHeader from "../components/Reusable/PageHeader";
import { useGetAllByTypeBerryKind } from "../api/berryKinds/useGetAllByTypeBerryKind";
import { useGetAllActiveEmployees } from "../api/employees/useGetAllActiveEmployees";
import HarvestInputBox from "../components/Harvest/HarvestInputBox";
import { getBerryType } from "../utils/berryTypeHelper";
import { useMemo } from "react";
import React from "react";
import { useAuth } from "../providers/AuthProvider";

export default React.memo(function collection() {
  const berryTypeData = useMemo(() => getBerryType(), []);
  const { userId: currentEmployeeId } = useAuth();

  const { data: berryKindsData } = useGetAllByTypeBerryKind(berryTypeData.id);
  const { data: employeesData } = useGetAllActiveEmployees();

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
        defaultEmployeeId={currentEmployeeId!}
      />
    </Box>
  );
});
