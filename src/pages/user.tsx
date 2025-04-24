import { Box } from "@mui/material";
import { useGetByIdEmployee } from "../api/employees/useGetByIdEmployee";
import EmployeeBox from "../components/Employee/EmployeeBox";
import PageHeader from "../components/Reusable/PageHeader";

export default function user() {
  const { data: employeeData, isLoading } = useGetByIdEmployee(
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
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
}
