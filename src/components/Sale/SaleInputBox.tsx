import Box from "@mui/material/Box";
import { BerryType } from "../../api/berryTypes/useGetByNameBerryType";
import { Typography } from "@mui/material";
import { useState } from "react";
import { BerryKindSelect } from "./BerryKindSelectField";
import { SaleTypeSelect } from "./SaleTypeSelectField";
import { CreateButton } from "./CreateButton";
import SaleInputBar from "./SaleInputBar";
import { BerryKind } from "../../api/berryKinds/useGetAllByTypeBerryKind";
import { useToast } from "../../hooks/useToast";
import { SALETYPE_DATA } from "./SaleTypeData";
import { useCreateSale } from "../../api/sales/useCreateSale";

interface SaleInputBoxProps {
  berryTypeData: BerryType;
  berryKindsData: BerryKind[] | undefined;
  employeeId: string;
  defaultBerryCost: string;
}

export default function SaleInputBox({
  berryTypeData,
  berryKindsData,
  defaultBerryCost,
  employeeId,
}: SaleInputBoxProps) {
  const toast = useToast();
  const createSaleMutation = useCreateSale();

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
          berryKindsData={berryKindsData}
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
        <SaleTypeSelect
          saleTypeData={SALETYPE_DATA}
          setState={setSaleType}
          value={saleType}
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="flex-start"
        gridColumn="span 12"
      >
        <CreateButton
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
          onSuccess={() => {
            toast.success("Sale created successfully!");
          }}
          onError={(error) => {
            toast.error(error.message);
          }}
          text={"Sale"}
          createMutation={createSaleMutation}
        ></CreateButton>
      </Box>
    </>
  );
}
