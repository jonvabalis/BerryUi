import { Box } from "@mui/material";
import { useGetByIdEmployee } from "../api/employees/useGetByIdEmployee";
import EmployeeBox from "../components/Employee/EmployeeBox";
import PageHeader from "../components/Reusable/PageHeader";
import React from "react";
import { useAuth } from "../providers/AuthProvider";

export default React.memo(function user() {
  const { userId: currentEmployeeId } = useAuth();
  const { data: employeeData, isLoading } = useGetByIdEmployee(
    currentEmployeeId!
  );

  if (isLoading) {
    return <PageHeader text="Data is being fetched" />;
  }

  if (!employeeData) {
    return <PageHeader text="No data is available" />;
  }

  return (
    <Box width="100vw">
      <Box>
        <PageHeader text="Employee overview" />
      </Box>
      <EmployeeBox data={employeeData} />
    </Box>
  );
});
