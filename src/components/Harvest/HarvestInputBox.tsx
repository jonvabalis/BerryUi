import { BerryType } from "../../api/berryTypes/useGetByNameBerryType";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { BerryKind } from "../../api/berryKinds/useGetAllByTypeBerryKind";
import { useToast } from "../../hooks/useToast";
import {
  HarvestCreate,
  useCreateHarvest,
} from "../../api/harvests/useCreateHarvest";
import { NumberField } from "../Sale/NumberField";
import { EmployeeData } from "../../api/employees/useGetByIdEmployee";
import { EmployeeSelectField } from "./EmployeeSelectField";
import { BerryKindSelect } from "../Sale/BerryKindSelectField";
import { CreateButton } from "../Sale/CreateButton";
import { GridContainer } from "../Reusable/GridContainer";
import BulkInputDialog from "../Reusable/BulkInputDialog";
import HarvestInputLine from "./HarvestInputLine";
import {
  BulkHarvestCreate,
  useCreateBulkHarvest,
} from "../../api/harvests/useCreateBulkHarvest";

interface HarvestInputBoxProps {
  berryTypeData: BerryType;
  berryKindsData: BerryKind[] | undefined;
  employeesData: EmployeeData[] | undefined;
  defaultEmployeeId: string;
}

export default function HarvestInputBox({
  berryTypeData,
  berryKindsData,
  employeesData,
  defaultEmployeeId,
}: HarvestInputBoxProps) {
  const toast = useToast();
  const createHarvestMutation = useCreateHarvest();
  const createBulkHarvestMutation = useCreateBulkHarvest();

  const [amount, setAmount] = useState<string>("0");
  const [kind, setKind] = useState<string>("Mixed");
  const [selectedEmployeeId, setEmployee] = useState<string>(defaultEmployeeId);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
  };

  const [bulkDialogOpen, setBulkDialogOpen] = useState<boolean>(false);
  const [bulkHarvest, setBulkHarvest] = useState<BulkHarvestCreate[]>([]);

  const handleBulkDialogOpen = () => setBulkDialogOpen(true);
  const handleBulkDialogClose = () => setBulkDialogOpen(false);

  const handleBulkDialogSubmit = (items: BulkHarvestCreate[]) => {
    //TODO call mutation
  };

  const emptyProduct: BulkHarvestCreate = {
    kilograms: 0,
    employeeId: "",
    berryTypeId: "",
    berryKindId: "",
    eventTime: new Date(),
  };
  return (
    <>
      <GridContainer span={12}>
        <NumberField
          number={amount}
          handleChange={handleAmountChange}
          label="Amount"
          adornment="kg"
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
        <Typography color="primary.contrastText">Select employee:</Typography>
        <EmployeeSelectField
          employeesData={employeesData}
          setState={setEmployee}
          value={selectedEmployeeId}
        />
      </GridContainer>
      <GridContainer span={6}>
        <CreateButton<HarvestCreate>
          data={{
            kilograms: Number(amount),
            employeeId: selectedEmployeeId,
            berryTypeId: berryTypeData.id,
            berryKindId: kind == "Mixed" ? null : kind,
          }}
          onSuccess={() => {
            toast.success("Harvest created successfully!");
          }}
          onError={(error) => {
            toast.error(error.message);
          }}
          text={"Harvest"}
          createMutation={createHarvestMutation}
        ></CreateButton>
      </GridContainer>
      <GridContainer span={6}>
        <Button variant="contained" onClick={handleBulkDialogOpen}>
          Input bulk
        </Button>
        <BulkInputDialog<BulkHarvestCreate>
          open={bulkDialogOpen}
          onClose={handleBulkDialogClose}
          title="Bulk harvest input"
          defaultItem={emptyProduct}
          addButtonText="Add another harvest"
          itemLabel="Harvest"
          createMutation={createBulkHarvestMutation}
        >
          <HarvestInputLine
            berryKindsData={berryKindsData}
            employeesData={employeesData}
            defaultEmployeeId={defaultEmployeeId}
            currentDate={new Date()}
          />
        </BulkInputDialog>
      </GridContainer>
    </>
  );
}
