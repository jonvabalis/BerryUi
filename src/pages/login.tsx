import React from "react";
import PageHeader from "../components/Reusable/PageHeader";
import { Box } from "@mui/material";
import LoginBox from "../components/Login/LoginBox";

export default React.memo(function login() {
  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Login" />
      </Box>
      <LoginBox />
    </Box>
  );
});
