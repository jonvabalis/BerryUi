import Box from "@mui/material/Box/Box";
import HistoryDataBox from "../components/HistoryData/HistoryDataBox";
import PageHeader from "../components/Reusable/PageHeader";
import { useGetAllByTypeBerryKind } from "../api/berryKinds/useGetAllByTypeBerryKind";

import { useGetAllEmployees } from "../api/employees/useGetAllEmployees";
import HistoryBulkInputBox from "../components/HistoryData/HistoryBulkInputBox";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { BerryType } from "../components/Themes/BerryData";

export default function historyData() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs().hour(23));
  const savedBerryType = localStorage.getItem("berryType");
  const berryTypeData = JSON.parse(savedBerryType!) as BerryType;

  const { data: berryKindsData } = useGetAllByTypeBerryKind(berryTypeData.id);
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
        berryTypeId={berryTypeData.id}
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
