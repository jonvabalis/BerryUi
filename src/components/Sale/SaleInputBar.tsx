import { Typography } from "@mui/material";
import { ChangeEvent } from "react";
import { NumberField } from "./NumberField";

interface SaleInputBarProps {
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  totalPrice: string;
  setTotalPrice: React.Dispatch<React.SetStateAction<string>>;
}

export default function SaleInputBar({
  amount,
  setAmount,
  price,
  setPrice,
  totalPrice,
  setTotalPrice,
}: SaleInputBarProps) {
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);

    const calculatedPrice = (Number(value) * Number(price)).toFixed(2);
    setTotalPrice(calculatedPrice);
  };

  const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value);

    const calculatedPrice = (Number(amount) * Number(value)).toFixed(2);
    setTotalPrice(calculatedPrice);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTotalPrice(value);
  };

  return (
    <>
      <NumberField
        number={amount}
        handleChange={handleAmountChange}
        label="Amount"
        adornment="kg"
      />
      <Typography color="primary.contrastText">x</Typography>
      <NumberField
        number={price}
        handleChange={handleCostChange}
        label="Cost"
        adornment="€"
      />
      <Typography color="primary.contrastText">=</Typography>
      <NumberField
        number={totalPrice}
        handleChange={handlePriceChange}
        label="Sum"
        adornment="€"
      />
    </>
  );
}
