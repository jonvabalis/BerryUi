import Box from "@mui/material/Box";
import PageHeader from "../components/Reusable/PageHeader";
import StatisticsBox from "../components/Statistics/StatisticsBox";
import { useMemo, useState } from "react";
import TabPanel from "../components/Reusable/TabPanel";
import StatisticsSettingChange from "../components/Statistics/StatisticsSettingChange";
import { getBerryType } from "../utils/berryTypeHelper";
import React from "react";
import CompareSeasonsBox from "../components/Statistics/CompareSeasonsBox";
import { useGetYearsWithData } from "../api/statistics/useGetYearsWithData";
import { YearSelect } from "../components/Statistics/StatisticsData";

export default React.memo(function statistics() {
  const berryTypeData = useMemo(() => getBerryType(), []);
  const [tabValue, setTabValue] = useState(0);
  const { data: yearsWithData } = useGetYearsWithData(berryTypeData.id);

  const yearSelectValues: YearSelect[] = useMemo(() => {
    return (
      yearsWithData?.map((year) => ({
        value: year,
        text: year.toString(),
      })) ?? []
    );
  }, [yearsWithData]);

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Statistics" />
      </Box>

      <StatisticsSettingChange
        tabValue={tabValue}
        handleTabChange={handleTabChange}
      />
      <Box sx={{ mt: 4 }} />

      <TabPanel value={tabValue} index={0}>
        <StatisticsBox
          berryTypeData={berryTypeData}
          yearSelectValues={yearSelectValues}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <CompareSeasonsBox
          berryTypeData={berryTypeData}
          yearSelectValues={yearSelectValues}
        />
      </TabPanel>
    </Box>
  );
});
