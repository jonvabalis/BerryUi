import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { SaleType } from "./SaleTypeData";

interface SaleTypeSelectFieldProps {
  saleTypeData: SaleType[];
  value: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
}

export function SaleTypeSelect({
  saleTypeData,
  value,
  setState,
}: SaleTypeSelectFieldProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setState(Number(event.target.value));
  };

  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">Kind</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value.toString()}
        onChange={handleChange}
        label="Sale"
      >
        {saleTypeData.map((data) => (
          <MenuItem key={data.value} value={data.value}>
            {data.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
