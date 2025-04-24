import Box from "@mui/material/Box";
import PageHeader from "../components/Reusable/PageHeader";
import {
  BerryType,
  useGetByNameBerryType,
} from "../api/berryTypes/useGetByNameBerryType";
import StatisticsBox from "../components/Statistics/StatisticsBox";
import { Tabs, Tab, Grid2 } from "@mui/material";
import { useState } from "react";
import { BoxPaper } from "../components/Reusable/BoxPaper";
import TabPanel from "../components/Reusable/TabPanel";

export default function statistics() {
  const savedBerryType = localStorage.getItem("berryType");
  const berryTypeName = savedBerryType
    ? (JSON.parse(savedBerryType) as BerryType).type
    : "not found";
  const { data: berryTypeData, isLoading } =
    useGetByNameBerryType(berryTypeName);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (isLoading) {
    return <PageHeader text="Data is being fetched" />;
  }

  if (!berryTypeData) {
    return <PageHeader text="No data is available" />;
  }

  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Statistics" />
      </Box>
      <BoxPaper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              [`& .MuiTabs-flexContainer`]: {
                flexWrap: "wrap",
                justifyContent: "center",
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            <Tab label="Berry Statistics" id="statistics-tab-0" />
            <Tab label="Employee Statistics" id="statistics-tab-1" />
            <Tab label="Global Statistics" id="statistics-tab-2" />
            <Tab label="Global Employee Statistics" id="statistics-tab-3" />
          </Tabs>
        </Box>
      </BoxPaper>
      <Box sx={{ mt: 4 }} />

      <TabPanel value={tabValue} index={0}>
        <StatisticsBox berryTypeData={berryTypeData} />
      </TabPanel>
    </Box>
  );
}
