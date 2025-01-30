import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { EmployeeData } from "../../api/employees/useGetByIdEmployee";

interface EmployeeSelectFieldProps {
  employeesData: EmployeeData[] | undefined;
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export function EmployeeSelectField({
  employeesData,
  value,
  setState,
}: EmployeeSelectFieldProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">Employee</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        onChange={handleChange}
        label="Employee"
      >
        {employeesData?.map((employeeData) => (
          <MenuItem key={employeeData.id} value={employeeData.id}>
            {employeeData.firstName} {employeeData.lastName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
