import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface SaleTypeSelectProps {
  value: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
}

export function SaleTypeSelect({ value, setState }: SaleTypeSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setState(Number(event.target.value));
  };

  const saleTypes = [
    {
      label: "Local",
      value: 0,
    },
    { label: "Order", value: 1 },
  ];

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
        {saleTypes.map((data) => (
          <MenuItem key={data.value} value={data.value}>
            {data.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
