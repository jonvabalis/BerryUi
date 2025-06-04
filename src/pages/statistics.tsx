import Box from "@mui/material/Box";
import PageHeader from "../components/Reusable/PageHeader";
import StatisticsBox from "../components/Statistics/StatisticsBox";
import { useState } from "react";
import TabPanel from "../components/Reusable/TabPanel";
import { BerryType } from "../components/Themes/BerryData";
import StatisticsSettingChange from "../components/Statistics/StatisticsSettingChange";

export default function statistics() {
  const savedBerryType = localStorage.getItem("berryType");
  const berryTypeData = JSON.parse(savedBerryType!) as BerryType;

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
    </Box>
  );
}
