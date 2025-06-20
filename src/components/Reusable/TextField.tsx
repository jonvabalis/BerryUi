import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { ChangeEvent } from "react";

interface TextFieldProps {
  text: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  inputType: string;
  errorMessage?: string;
  isError?: boolean;
}

export function TextField({
  text,
  handleChange,
  label,
  inputType,
  errorMessage,
  isError,
}: TextFieldProps) {
  return (
    <FormControl
      variant="outlined"
      error={isError ?? false}
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
        type={inputType}
        value={text}
        onChange={handleChange}
      />
      <FormHelperText>{errorMessage ?? ""}</FormHelperText>
    </FormControl>
  );
}
