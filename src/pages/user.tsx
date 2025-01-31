import { Box } from "@mui/material";
import { useGetByIdEmployee } from "../api/employees/useGetByIdEmployee";
import EmployeeData from "../components/Employee/EmployeeData";

export default function user() {
  const { data, isLoading } = useGetByIdEmployee(
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  );

  if (!data) {
    return (
      <Box sx={{ color: "primary.contrastText" }}>
        No employee data is available
      </Box>
    );
  }

  return (
    <>
      {isLoading ? "Data is being fetched" : !isLoading && EmployeeData(data)}
    </>
  );
}
