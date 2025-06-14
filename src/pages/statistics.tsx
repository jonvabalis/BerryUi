import Box from "@mui/material/Box";
import PageHeader from "../components/Reusable/PageHeader";
import StatisticsBox from "../components/Statistics/StatisticsBox";
import { useMemo, useState } from "react";
import TabPanel from "../components/Reusable/TabPanel";
import StatisticsSettingChange from "../components/Statistics/StatisticsSettingChange";
import { getBerryType } from "../utils/berryTypeHelper";
import React from "react";
import CompareSeasonsBox from "../components/Statistics/CompareSeasonsBox";

export default React.memo(function statistics() {
  const berryTypeData = useMemo(() => getBerryType(), []);
  const [tabValue, setTabValue] = useState(0);

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
        <StatisticsBox berryTypeData={berryTypeData} />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <CompareSeasonsBox berryTypeData={berryTypeData} />
      </TabPanel>
    </Box>
  );
});
