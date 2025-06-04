import Box from "@mui/material/Box";
import PageHeader from "../components/Reusable/PageHeader";
import SaleInputBox from "../components/Sale/SaleInputBox";
import { useGetAllByTypeBerryKind } from "../api/berryKinds/useGetAllByTypeBerryKind";
import { useGetAllEmployees } from "../api/employees/useGetAllEmployees";
import { useMemo } from "react";
import { getBerryType } from "../utils/berryTypeHelper";

export default function sale() {
  const berryTypeData = useMemo(() => getBerryType(), []);

  const { data: berryKindsData } = useGetAllByTypeBerryKind(berryTypeData.id);
  const { data: employeesData } = useGetAllEmployees();
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
        defaultEmployeeId={employeeId}
        employeesData={employeesData}
      />
    </Box>
  );
}
