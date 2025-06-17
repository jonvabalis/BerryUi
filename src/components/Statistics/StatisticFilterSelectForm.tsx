import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { MonthSelect, YearSelect } from "./StatisticsData";

interface StatisticFilterSelectForm {
  inputLabel: string;
  selectedValues: number[];
  handleChange: (event: SelectChangeEvent<number[]>) => void;
  availableValues: YearSelect[] | MonthSelect[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function StatisticFilterSelectForm({
  inputLabel,
  selectedValues,
  handleChange,
  availableValues,
}: StatisticFilterSelectForm) {
  return (
    <FormControl sx={{ width: 300 }}>
      <InputLabel id={`multiple-checkbox-${inputLabel}`}>
        {inputLabel}
      </InputLabel>
      <Select
        labelId={`multiple-checkbox-${inputLabel}`}
        id={"multiple-checkbox"}
        label={inputLabel}
        multiple
        value={selectedValues}
        onChange={handleChange}
        input={<OutlinedInput label={inputLabel} />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {availableValues.map((yearSelect) => (
          <MenuItem key={yearSelect.value} value={yearSelect.value}>
            <Checkbox checked={selectedValues.includes(yearSelect.value)} />
            <ListItemText primary={yearSelect.text} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
