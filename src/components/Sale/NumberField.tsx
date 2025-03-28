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
      variant="outlined"
      sx={{
        mt: 1.25,
        width: { xs: "100%", md: "auto" },
        minWidth: { xs: "100%", md: 200 },
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
          {
            display: "none",
          },
        "& input[type=number]": {
          MozAppearance: "textfield",
        },
      }}
    >
      <InputLabel htmlFor={`outlined-adornment-${label}`}>{label}</InputLabel>
      <OutlinedInput
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
        }}
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
