import Box from "@mui/material/Box";
import PageHeader from "../components/Employee/PageHeader";
import CostInputBox from "../components/Cost/CostInputBox";

export default function costs() {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="100px"
      gap={2}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="flex-start"
        gridColumn="span 12"
      >
        <PageHeader text="Costs input" />
      </Box>
      <CostInputBox />
    </Box>
  );
}
