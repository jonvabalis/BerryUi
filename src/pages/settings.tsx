import { Box } from "@mui/material";
import SettingsBox from "../components/Settings/SettingsBox";
import PageHeader from "../components/Reusable/PageHeader";

export default function settings() {
  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Settings" />
      </Box>
      <SettingsBox />
    </Box>
  );
}
