import { Box, Grid2, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import { NumberField } from "./NumberField";

interface SaleInputBarProps {
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  handleParentAmountChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  handleParentPriceChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  totalPrice: string;
  setTotalPrice: React.Dispatch<React.SetStateAction<string>>;
  handleParentTotalPriceChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SaleInputBar({
  amount,
  setAmount,
  handleParentAmountChange,
  price,
  setPrice,
  handleParentPriceChange,
  totalPrice,
  setTotalPrice,
  handleParentTotalPriceChange,
}: SaleInputBarProps) {
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(Math.max(0, Number(value)).toString());

    const calculatedPrice = (Number(value) * Number(price)).toFixed(2);
    setTotalPrice(calculatedPrice);

    handleParentAmountChange?.(e);
  };

  const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(Math.max(0, Number(value)).toString());

    const calculatedPrice = (Number(amount) * Number(value)).toFixed(2);
    setTotalPrice(calculatedPrice);

    handleParentPriceChange?.(e);
  };

  const handleTotalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTotalPrice(Math.max(0, Number(value)).toString());

    handleParentTotalPriceChange?.(e);
  };

  return (
    <Grid2
      container
      spacing={1}
      size={12}
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Grid2 container size={{ xs: 12, md: 3, sm: 3 }}>
        <NumberField
          number={amount}
          handleChange={handleAmountChange}
          label="Amount"
          adornment="kg"
        />
      </Grid2>
      <Grid2
        container
        size={{ md: 0.25, sm: 0.25 }}
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            mt: "5px",
            display: { xs: "none", md: "initial", sm: "initial" },
          }}
        >
          x
        </Typography>
      </Grid2>
      <Grid2 container size={{ xs: 12, md: 3, sm: 3 }}>
        <NumberField
          number={price}
          handleChange={handleCostChange}
          label="Cost"
          adornment="€"
        />
      </Grid2>
      <Grid2
        container
        size={{ md: 0.25, sm: 0.25 }}
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            mt: "5px",
            display: { xs: "none", md: "initial", sm: "initial" },
          }}
        >
          =
        </Typography>
      </Grid2>
      <Grid2 container spacing={1} size={{ xs: 12, md: 3.75, sm: 3.75 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: { xs: "100%" },
          }}
        >
          <NumberField
            number={totalPrice}
            handleChange={handleTotalChange}
            label="Total"
            adornment="€"
          />
        </Box>
      </Grid2>
    </Grid2>
  );
}
