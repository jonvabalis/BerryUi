import Box from "@mui/material/Box/Box";
import HistoryDataBox from "../components/HistoryData/HistoryDataBox";
import PageHeader from "../components/Reusable/PageHeader";
import { useGetAllByTypeBerryKind } from "../api/berryKinds/useGetAllByTypeBerryKind";
import React from "react";
import { useGetAllEmployees } from "../api/employees/useGetAllEmployees";
import HistoryBulkInputBox from "../components/HistoryData/HistoryBulkInputBox";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { useGetAllRecordedDaysByYear } from "../api/history/useGetAllRecordedDaysByYear";
import { useGetBriefByDay } from "../api/history/useGetBriefByDay";
import { getBerryType } from "../utils/berryTypeHelper";
import { BoxPaper } from "../components/Reusable/BoxPaper";
import { HistoryDataHarvestTable } from "../components/HistoryData/HistoryDataTableView/HistoryDataHarvestTable";
import { HistoryDataSaleTable } from "../components/HistoryData/HistoryDataTableView/HistoryDataSaleTable";
import { SALETYPE_DATA } from "../components/Sale/SaleTypeData";

export default React.memo(function historyData() {
  const berryTypeData = useMemo(() => getBerryType(), []);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs().hour(23));
  const [currentDataYear, setCurrentDataYear] = useState<number>(
    selectedDate ? selectedDate.year() : dayjs().hour(23).year
  );

  const { data: berryKindsData } = useGetAllByTypeBerryKind(berryTypeData.id);
  const { data: employeesData } = useGetAllEmployees();
  const { data: datesWithData, refetch: refetchRecordedDaysByYear } =
    useGetAllRecordedDaysByYear(currentDataYear, berryTypeData.id);
  const { data: selectedDateBrief, refetch: refetchBriefByDay } =
    useGetBriefByDay(selectedDate.format("YYYY-MM-DD"), berryTypeData.id);
  const currentEmployeeId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

  if (!berryTypeData) {
    return <PageHeader text="No data is available" />;
  }

  const refetchAfterHistoryInput = useCallback(async () => {
    await Promise.all([refetchBriefByDay(), refetchRecordedDaysByYear()]);
  }, []);

  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="History data" />
      </Box>
      <HistoryDataBox
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        datesWithData={datesWithData}
        currentDataYear={currentDataYear}
        setCurrentDataYear={setCurrentDataYear}
        selectedDateBrief={selectedDateBrief}
      />
      <Box sx={{ mt: 4 }} />
      <HistoryBulkInputBox
        employeesData={employeesData}
        berryKindsData={berryKindsData}
        defaultEmployeeId={currentEmployeeId}
        berryTypeData={berryTypeData}
        selectedDate={selectedDate}
        refetchAfterHistoryInput={refetchAfterHistoryInput}
      />
      <Box sx={{ mt: 4 }} />
      <BoxPaper>
        <HistoryDataHarvestTable
          selectedDate={selectedDate}
          employeesData={employeesData}
          berryKindsData={berryKindsData}
        />
      </BoxPaper>
      <Box sx={{ mt: 4 }} />
      <BoxPaper>
        <HistoryDataSaleTable
          selectedDate={selectedDate}
          employeesData={employeesData}
          berryKindsData={berryKindsData}
          saleTypeData={SALETYPE_DATA}
        />
      </BoxPaper>
    </Box>
  );
});
