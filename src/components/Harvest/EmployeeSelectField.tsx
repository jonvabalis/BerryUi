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
  onChange?: (e: string) => void;
}

export function EmployeeSelectField({
  employeesData,
  value,
  setState,
  onChange,
}: EmployeeSelectFieldProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <FormControl
      variant="outlined"
      sx={{
        mt: 1.25,
        width: { xs: "100%", md: "auto" },
        minWidth: { xs: "100%", md: 200 },
      }}
    >
      <InputLabel id="demo-simple-select-standard-label">Employee</InputLabel>
      <Select
        sx={{
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.secondary",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.secondary",
          },
          "& .MuiSvgIcon-root": {
            color: "primary.main",
          },
        }}
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
