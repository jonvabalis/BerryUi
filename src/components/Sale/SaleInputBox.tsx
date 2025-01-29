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
import SaleInputBar from "./SaleInputBar";

interface SaleInputBoxProps {
  berryTypeData: BerryType;
  employeeId: string;
  defaultBerryCost: string;
}

export default function SaleInputBox({
  berryTypeData,
  defaultBerryCost,
  employeeId,
}: SaleInputBoxProps) {
  const [amount, setAmount] = useState<string>("0");
  const [price, setPrice] = useState<string>(defaultBerryCost);
  const [totalPrice, setTotalPrice] = useState<string>("0");

  const [kind, setKind] = useState<string>("Mixed");
  const [saleType, setSaleType] = useState<number>(0);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="flex-start"
        gridColumn="span 12"
      >
        <SaleInputBar
          amount={amount}
          setAmount={setAmount}
          price={price}
          setPrice={setPrice}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
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
        <BerryKindSelect
          typeId={berryTypeData.id}
          setState={setKind}
          value={kind}
        />
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
            pricePerKilo: Number(price),
            totalPrice: Number(totalPrice),
            employeeId: employeeId,
            saleType: Number(saleType),
            eventTime: new Date(),
            berryTypeId: berryTypeData.id,
            berryKindId: kind == "Mixed" ? null : kind,
          }}
        ></CreateSaleButton>
      </Box>
    </>
  );
}
