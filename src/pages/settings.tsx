import { Box } from "@mui/material";
import SettingsBox from "../components/Settings/SettingsBox";
import PageHeader from "../components/Reusable/PageHeader";
import BerryKindAddBox from "../components/Settings/BerryKindAddBox";

export default function settings() {
  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Settings" />
      </Box>
      <SettingsBox />
      <Box sx={{ mt: 4 }} />
      <BerryKindAddBox />
    </Box>
  );
}
