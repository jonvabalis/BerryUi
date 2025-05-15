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
  onChange?: (e: number) => void;
}

export function SaleTypeSelect({
  saleTypeData,
  value,
  setState,
  onChange,
}: SaleTypeSelectFieldProps) {
  const handleChange = (event: SelectChangeEvent) => {
    const value = Number(event.target.value);
    setState(value);
    onChange?.(value);
  };

  return (
    <FormControl
      variant="outlined"
      sx={{
        mt: 1.25,
        width: { xs: "100%" },
        minWidth: { xs: "100%" },
      }}
    >
      <InputLabel id="demo-simple-select-standard-label">Sale</InputLabel>
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
