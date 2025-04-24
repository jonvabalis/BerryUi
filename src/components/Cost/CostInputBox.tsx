import { ChangeEvent, useState } from "react";
import { useToast } from "../../hooks/useToast";
import { NumberField } from "../Sale/NumberField";
import { CreateButton } from "../Sale/CreateButton";
import { CostCreate, useCreateCost } from "../../api/costs/useCreateCost";
import { Grid2 } from "@mui/material";
import { BoxPaper } from "../Reusable/BoxPaper";

export default function CostInputBox() {
  const toast = useToast();
  const createSaleMutation = useCreateCost();

  const [cost, setCost] = useState<string>("0");

  const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCost(Math.max(0, Number(value)).toString());
  };

  return (
    <BoxPaper>
      <Grid2 container spacing={4}>
        <Grid2
          container
          spacing={1}
          size={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <NumberField
            number={cost}
            handleChange={handleCostChange}
            label="Cost"
            adornment="€"
          />
        </Grid2>
        <Grid2
          container
          spacing={1}
          size={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
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
        </Grid2>
      </Grid2>
    </BoxPaper>
  );
}
