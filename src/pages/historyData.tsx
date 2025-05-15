import Box from "@mui/material/Box/Box";
import HistoryDataBox from "../components/HistoryData/HistoryDataBox";
import PageHeader from "../components/Reusable/PageHeader";
import { useGetAllByTypeBerryKind } from "../api/berryKinds/useGetAllByTypeBerryKind";
import {
  BerryType,
  useGetByNameBerryType,
} from "../api/berryTypes/useGetByNameBerryType";
import { useGetAllEmployees } from "../api/employees/useGetAllEmployees";
import HistoryBulkInputBox from "../components/HistoryData/HistoryBulkInputBox";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

export default function historyData() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs().hour(23));
  const savedBerryType = localStorage.getItem("berryType");
  const berryTypeName = savedBerryType
    ? (JSON.parse(savedBerryType) as BerryType).type
    : "not found";
  const { data: berryTypeData } = useGetByNameBerryType(berryTypeName);

  const { data: berryKindsData } = useGetAllByTypeBerryKind(berryTypeData?.id, {
    enabled: !!berryTypeData,
  });

  const { data: employeesData } = useGetAllEmployees();
  const currentEmployeeId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

  if (!berryTypeData) {
    return <PageHeader text="No data is available" />;
  }

  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="History data" />
      </Box>
      <HistoryDataBox
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Box sx={{ mt: 4 }} />
      <HistoryBulkInputBox
        employeesData={employeesData}
        berryKindsData={berryKindsData}
        defaultEmployeeId={currentEmployeeId}
        berryTypeData={berryTypeData}
        selectedDate={selectedDate}
      />
    </Box>
  );
}
