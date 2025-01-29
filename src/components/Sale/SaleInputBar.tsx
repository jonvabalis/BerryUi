import Box from "@mui/material/Box";
import { BerryType } from "../../api/berryTypes/useGetByNameBerryType";
import { Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { NumberField } from "./NumberField";
import PageHeader from "../Employee/PageHeader";
import { BerryKindSelect } from "./BerryKindSelect";
import { SaleTypeSelect } from "./SaleTypeSelect";
import sale from "../../pages/sale";
import { CreateSaleButton } from "./SaleCreateButton";

interface SaleInputBarProps {
  data: BerryType;
}

export default function SaleInputBar({ data }: SaleInputBarProps) {
  const defaultBerryCost = "6";
  const [amount, setAmount] = useState<string>("0");
  const [cost, setCost] = useState<string>(defaultBerryCost);
  const [price, setPrice] = useState<string>("0");

  const [kind, setKind] = useState<string>("Mixed");
  const [saleType, setSaleType] = useState<number>(0);

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
        <PageHeader text="Sale input" />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="flex-start"
        gridColumn="span 12"
      >
        <NumberField
          number={amount}
          handleChange={handleAmountChange}
          label="Amount"
          adornment="kg"
        />
        <Typography color="primary.contrastText">x</Typography>
        <NumberField
          number={cost}
          handleChange={handleCostChange}
          label="Cost"
          adornment="€"
        />
        <Typography color="primary.contrastText">=</Typography>
        <NumberField
          number={price}
          handleChange={handlePriceChange}
          label="Sum"
          adornment="€"
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="flex-start"
        gridColumn="span 6"
      >
        <Typography color="primary.contrastText">Select berry kind:</Typography>
        <BerryKindSelect typeId={data.id} setState={setKind} value={kind} />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="flex-start"
        gridColumn="span 6"
      >
        <Typography color="primary.contrastText">Select sale type:</Typography>
        <SaleTypeSelect setState={setSaleType} value={saleType} />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="flex-start"
        gridColumn="span 12"
      >
        <CreateSaleButton
          saleData={{
            kilograms: Number(amount),
            pricePerKilo: Number(cost),
            totalPrice: Number(price),
            employeeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            saleType: Number(saleType),
            eventTime: new Date(),
            berryTypeId: data.id,
            berryKindId: kind == "Mixed" ? null : kind,
          }}
        ></CreateSaleButton>
      </Box>
    </Box>
  );
}
