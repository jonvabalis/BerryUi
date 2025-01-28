import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { ChangeEvent } from "react";

interface NumberFieldProps {
  number: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  adornment: string;
}

export function NumberField({
  number,
  handleChange,
  label,
  adornment,
}: NumberFieldProps) {
  return (
    <FormControl
      sx={{
        m: 1,
        width: "25ch",
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
          {
            display: "none",
          },
        "& input[type=number]": {
          MozAppearance: "textfield",
        },
      }}
      variant="outlined"
      color="primary"
    >
      <InputLabel htmlFor={`outlined-adornment-${label}`}>{label}</InputLabel>
      <OutlinedInput
        id={`outlined-adornment-${label}`}
        endAdornment={
          <InputAdornment position="end">{adornment}</InputAdornment>
        }
        label={label}
        type="number"
        value={number}
        onChange={handleChange}
      />
    </FormControl>
  );
}
