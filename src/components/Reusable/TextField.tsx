import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { ChangeEvent } from "react";

interface TextFieldProps {
  text: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export function TextField({ text, handleChange, label }: TextFieldProps) {
  return (
    <FormControl
      variant="outlined"
      sx={{
        mt: 1.25,
        width: { xs: "100%" },
        minWidth: { xs: "100%" },
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
        label={label}
        type="text"
        value={text}
        onChange={handleChange}
      />
    </FormControl>
  );
}
