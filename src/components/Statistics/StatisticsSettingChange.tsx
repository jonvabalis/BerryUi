import { Box, Tabs, Tab } from "@mui/material";
import { BoxPaper } from "../Reusable/BoxPaper";

interface StatisticsSettingChangeProps {
  tabValue: number;
  handleTabChange: (_e: React.SyntheticEvent, newValue: number) => void;
}

export default function StatisticsSettingChange({
  tabValue,
  handleTabChange,
}: StatisticsSettingChangeProps) {
  return (
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
  );
}
