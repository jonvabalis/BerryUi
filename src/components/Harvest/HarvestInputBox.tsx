import { BerryType } from "../../api/berryTypes/useGetByNameBerryType";
import {
  Box,
  Button,
  Fade,
  Grid,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
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
  const [kind, setKind] = useState<string | null>(null);
  const [selectedEmployeeId, setEmployee] = useState<string>(defaultEmployeeId);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
  };

  const [bulkDialogOpen, setBulkDialogOpen] = useState<boolean>(false);

  const handleBulkDialogOpen = () => setBulkDialogOpen(true);
  const handleBulkDialogClose = () => setBulkDialogOpen(false);

  const today = new Date();
  const todayFormatted = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    2,
    0,
    0,
    0
  );

  const emptyProduct: BulkHarvestCreate = {
    kilograms: 0,
    employeeId: "",
    berryTypeId: "",
    berryKindId: "",
    eventTime: todayFormatted,
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Fade in={true} timeout={500}>
        <Paper
          elevation={5}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "rgba(44, 150, 221, 0.8)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Box>
                  <NumberField
                    number={amount}
                    handleChange={handleAmountChange}
                    label="Amount"
                    adornment="kg"
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography color="primary.contrastText">
                    Select berry kind:
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <BerryKindSelect
                      berryKindsData={berryKindsData}
                      setState={setKind}
                      value={kind}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography color="primary.contrastText">
                    Select employee:
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <EmployeeSelectField
                      employeesData={employeesData}
                      setState={setEmployee}
                      value={selectedEmployeeId}
                    />
                  </Box>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <CreateButton<HarvestCreate>
                  data={{
                    kilograms: Number(amount),
                    employeeId: selectedEmployeeId,
                    berryTypeId: berryTypeData.id,
                    berryKindId: kind,
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
                  toastSuccess={"Harvests created successfully!"}
                >
                  <HarvestInputLine
                    berryKindsData={berryKindsData}
                    employeesData={employeesData}
                    defaultEmployeeId={defaultEmployeeId}
                  />
                </BulkInputDialog>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Box>
  );
}
