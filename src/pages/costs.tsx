import Box from "@mui/material/Box";
import PageHeader from "../components/Employee/PageHeader";
import CostInputBox from "../components/Cost/CostInputBox";
import { GridContainer } from "../components/Reusable/GridContainer";

export default function costs() {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="100px"
      gap={2}
    >
      <GridContainer span={12}>
        <PageHeader text="Costs input" />
      </GridContainer>
      <CostInputBox />
    </Box>
  );
}
