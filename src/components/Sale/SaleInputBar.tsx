import Box from "@mui/material/Box";
import { BerryType } from "../../api/berryTypes/useGetByNameBerryType";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

interface SaleInputBarProps {
  data: BerryType;
}

export default function SaleInputBar({ data }: SaleInputBarProps) {
  const defaultBerryCost = "6";
  const [amount, setAmount] = useState<string>("0");
  const [cost, setCost] = useState<string>(defaultBerryCost);
  const [price, setPrice] = useState<string>("0");

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);

    const calculatedPrice = (Number(value) * Number(cost)).toFixed(2);
    setPrice(calculatedPrice);
  };

  const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCost(value);

    const calculatedPrice = (Number(amount) * Number(value)).toFixed(2);
    setPrice(calculatedPrice);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value);
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="100px"
      gap={2}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="flex-start"
        gridColumn="span 12"
      >
        <Typography
          variant="h1"
          sx={{
            my: 4,
            textAlign: "center",
            color: "primary.contrastText",
          }}
        >
          Sale input
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="flex-start"
        gridColumn="span 12"
      >
        {/* First Number Input */}
        <FormControl
          sx={{ m: 1, width: "25ch" }}
          variant="outlined"
          color="primary"
        >
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            label="Amount"
            type="tel"
            value={amount}
            onChange={handleAmountChange}
          />
        </FormControl>

        {/* Static Text "x" */}
        <Typography color="primary.contrastText">x</Typography>

        {/* Second Number Input */}
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-cost">Cost</InputLabel>
          <OutlinedInput
            id="outlined-adornment-cost"
            endAdornment={<InputAdornment position="end">€</InputAdornment>}
            label="Cost"
            value={cost}
            type="tel"
            onChange={handleCostChange}
          />
        </FormControl>

        {/* Static Text "=" */}
        <Typography color="primary.contrastText">=</Typography>

        {/* Result Field (Read-only) */}
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
          <InputLabel htmlFor="outlined-adornment-sum">Sum</InputLabel>
          <OutlinedInput
            id="outlined-adornment-sum"
            endAdornment={<InputAdornment position="end">€</InputAdornment>}
            label="Sum"
            type="tel"
            value={price}
            onChange={handlePriceChange}
          />
        </FormControl>
      </Box>
    </Box>
  );
}
