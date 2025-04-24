import Box from "@mui/material/Box";
import PageHeader from "../components/Employee/PageHeader";
import CostInputBox from "../components/Cost/CostInputBox";

export default function costs() {
  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Costs input" />
      </Box>
      <CostInputBox />
    </Box>
  );
}
