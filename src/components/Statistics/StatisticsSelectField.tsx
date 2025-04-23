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
  radioValue: string;
}

export function StatisticsSelectField<T extends YearSelect | MonthSelect>({
  data,
  value,
  setState,
  label,
  radioValue,
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
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value.toString()}
        onChange={handleChange}
        label={label}
      >
        <MenuItem key={0} value={0}>
          All
        </MenuItem>
        {data?.map((entry) => (
          <MenuItem key={entry.value} value={entry.value}>
            {entry.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
