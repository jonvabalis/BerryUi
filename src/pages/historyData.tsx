import Box from "@mui/material/Box/Box";
import HistoryDataBox from "../components/HistoryData/HistoryDataBox";
import PageHeader from "../components/Reusable/PageHeader";

export default function historyData() {
  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="History data" />
      </Box>
      <HistoryDataBox />
    </Box>
  );
}
