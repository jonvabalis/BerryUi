import Box from "@mui/material/Box";
import PageHeader from "../components/Reusable/PageHeader";
import CostInputBox from "../components/Cost/CostInputBox";
import React from "react";

export default React.memo(function costs() {
  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Costs input" />
      </Box>
      <CostInputBox />
    </Box>
  );
});
