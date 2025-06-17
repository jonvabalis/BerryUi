import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { MonthSelect, YearSelect } from "./StatisticsData";

interface StatisticsSelectFieldProps<T extends YearSelect | MonthSelect> {
  data: T[];
  value: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
  label: string;
  radioValue?: string;
  selectAllValues: boolean;
}

export function StatisticsSelectField<T extends YearSelect | MonthSelect>({
  data,
  value,
  setState,
  label,
  radioValue,
  selectAllValues,
}: StatisticsSelectFieldProps<T>) {
  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setState(Number(selectedValue));
  };
  return (
    <FormControl
      variant="filled"
      sx={{
        width: { xs: "100%" },
        minWidth: { xs: "100%" },
      }}
      disabled={radioValue === "alltime"}
    >
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
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
          "&.Mui-disabled .MuiSvgIcon-root": {
            color: "gray",
          },
        }}
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value.toString()}
        onChange={handleChange}
        label={label}
      >
        {selectAllValues && (
          <MenuItem key={0} value={0}>
            All
          </MenuItem>
        )}
        {data?.map((entry) => (
          <MenuItem key={entry.value} value={entry.value}>
            {entry.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
