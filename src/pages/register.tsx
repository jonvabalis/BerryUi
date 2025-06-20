import { Box } from "@mui/material";
import React from "react";
import PageHeader from "../components/Reusable/PageHeader";
import RegisterBox from "../components/Register/RegisterBox";

export default React.memo(function about() {
  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Register" />
      </Box>
      <RegisterBox />
    </Box>
  );
});
