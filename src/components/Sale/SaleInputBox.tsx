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
import { SaleCreate, useCreateSale } from "../../api/sales/useCreateSale";
import { GridContainer } from "../Reusable/GridContainer";

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
    <>
      <GridContainer span={12}>
        <SaleInputBar
          amount={amount}
          setAmount={setAmount}
          price={price}
          setPrice={setPrice}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
      </GridContainer>
      <GridContainer span={6}>
        <Typography color="primary.contrastText">Select berry kind:</Typography>
        <BerryKindSelect
          berryKindsData={berryKindsData}
          setState={setKind}
          value={kind}
        />
      </GridContainer>
      <GridContainer span={6}>
        <Typography color="primary.contrastText">Select sale type:</Typography>
        <SaleTypeSelect
          saleTypeData={SALETYPE_DATA}
          setState={setSaleType}
          value={saleType}
        />
      </GridContainer>
      <GridContainer span={12}>
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
        ></CreateButton>
      </GridContainer>
    </>
  );
}
