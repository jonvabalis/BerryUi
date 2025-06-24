import Box from "@mui/material/Box";
import PageHeader from "../components/Reusable/PageHeader";
import SaleInputBox from "../components/Sale/SaleInputBox";
import { useGetAllByTypeBerryKind } from "../api/berryKinds/useGetAllByTypeBerryKind";
import { useGetAllActiveEmployees } from "../api/employees/useGetAllActiveEmployees";
import { useMemo } from "react";
import { getBerryType } from "../utils/berryTypeHelper";
import React from "react";
import { useAuth } from "../providers/AuthProvider";

export default React.memo(function sale() {
  const berryTypeData = useMemo(() => getBerryType(), []);
  const { userId: currentEmployeeId } = useAuth();

  const { data: berryKindsData } = useGetAllByTypeBerryKind(berryTypeData.id);
  const { data: employeesData } = useGetAllActiveEmployees();
  const defaultBerryCost = "6";

  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Sale input" />
      </Box>
      <SaleInputBox
        berryTypeData={berryTypeData}
        berryKindsData={berryKindsData}
        defaultBerryCost={defaultBerryCost}
        defaultEmployeeId={currentEmployeeId!}
        employeesData={employeesData}
      />
    </Box>
  );
});
