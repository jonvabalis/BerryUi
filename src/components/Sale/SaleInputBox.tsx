import { BerryType } from "../../api/berryTypes/useGetByNameBerryType";
import { Box, Grid2, Typography } from "@mui/material";
import { useState } from "react";
import { BerryKindSelect } from "./BerryKindSelectField";
import { SaleTypeSelect } from "./SaleTypeSelectField";
import { CreateButton } from "./CreateButton";
import SaleInputBar from "./SaleInputBar";
import { BerryKind } from "../../api/berryKinds/useGetAllByTypeBerryKind";
import { useToast } from "../../hooks/useToast";
import { SALETYPE_DATA } from "./SaleTypeData";
import { SaleCreate, useCreateSale } from "../../api/sales/useCreateSale";
import { BoxPaper } from "../Reusable/BoxPaper";

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

  const [kind, setKind] = useState<string | null>(null);
  const [saleType, setSaleType] = useState<number>(0);

  return (
    <BoxPaper>
      <Grid2 container spacing={4} size={12}>
        <Grid2
          container
          spacing={1}
          size={12}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
          }}
        >
          <SaleInputBar
            amount={amount}
            setAmount={setAmount}
            price={price}
            setPrice={setPrice}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />
        </Grid2>
      </Grid2>
      <Grid2
        container
        spacing={2}
        size={{ xs: 12, md: 6 }}
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
        }}
      >
        <Grid2 container size={{ xs: 12, sm: 6, md: 6 }}>
          <Box sx={{ width: "100%" }}>
            <Typography>Select berry kind:</Typography>
            <BerryKindSelect
              berryKindsData={berryKindsData}
              setState={setKind}
              value={kind}
            />
          </Box>
        </Grid2>
        <Grid2 container size={{ xs: 12, sm: 6, md: 6 }}>
          <Box sx={{ width: "100%" }}>
            <Typography>Select sale type:</Typography>
            <SaleTypeSelect
              saleTypeData={SALETYPE_DATA}
              setState={setSaleType}
              value={saleType}
            />
          </Box>
        </Grid2>
      </Grid2>
      <Grid2
        container
        size={12}
        sx={{
          mt: 2,
          justifyContent: "center",
        }}
      >
        <Box
          width={"100%"}
          maxWidth={"250px"}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <CreateButton<SaleCreate>
            data={{
              kilograms: Number(amount),
              pricePerKilo: Number(price),
              totalPrice: Number(totalPrice),
              employeeId: employeeId,
              saleType: Number(saleType),
              berryTypeId: berryTypeData.id,
              berryKindId: kind,
            }}
            onSuccess={() => {
              toast.success("Sale created successfully!");
            }}
            onError={(error) => {
              toast.error(error.message);
            }}
            text={"Sale"}
            createMutation={createSaleMutation}
          />
        </Box>
      </Grid2>
    </BoxPaper>
  );
}
