import Box from "@mui/material/Box";
import { ChangeEvent, useState } from "react";
import { useToast } from "../../hooks/useToast";
import { NumberField } from "../Sale/NumberField";
import { CreateButton } from "../Sale/CreateButton";
import { CostCreate, useCreateCost } from "../../api/costs/useCreateCost";

export default function CostInputBox() {
  const toast = useToast();
  const createSaleMutation = useCreateCost();

  const [cost, setCost] = useState<string>("0");

  const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCost(value);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="flex-start"
        gridColumn="span 12"
      >
        <NumberField
          number={cost}
          handleChange={handleCostChange}
          label="Cost"
          adornment="€"
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="flex-start"
        gridColumn="span 12"
      >
        <CreateButton<CostCreate>
          data={{
            price: Number(cost),
          }}
          onSuccess={() => {
            toast.success("Cost created successfully!");
          }}
          onError={(error) => {
            toast.error(error.message);
          }}
          text={"Cost"}
          createMutation={createSaleMutation}
        ></CreateButton>
      </Box>
    </>
  );
}
