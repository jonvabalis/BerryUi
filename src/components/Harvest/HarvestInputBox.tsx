import { BerryType } from "../../api/berryTypes/useGetByNameBerryType";
import {
  Box,
  Divider,
  Fade,
  Grid2,
  IconButton,
  Link,
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
import BulkInputDialog from "../Reusable/BulkInputDialog";
import HarvestInputLine from "./HarvestInputLine";
import {
  BulkHarvestCreate,
  useCreateBulkHarvest,
} from "../../api/harvests/useCreateBulkHarvest";
import { Add as PlusIcon, Remove as MinusIcon } from "@mui/icons-material";

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
    setAmount(Math.max(0, Number(value)).toString());
  };

  const handleAmountIncrease = () => {
    setAmount((prev) => (Number(prev) + 1).toString());
  };

  const handleAmountDecrease = () => {
    setAmount((prev) => Math.max(0, Number(prev) - 1).toString());
  };

  const handleReset = () => {
    setAmount("0");
  };

  const [bulkDialogOpen, setBulkDialogOpen] = useState<boolean>(false);

  const handleBulkDialogOpen = () => setBulkDialogOpen(true);
  const handleBulkDialogClose = () => setBulkDialogOpen(false);

  const today = new Date();
  const todayFormatted = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      0,
      0,
      0,
      0
    )
  );

  const emptyProduct: BulkHarvestCreate = {
    kilograms: 0,
    employeeId: "",
    berryTypeId: "",
    berryKindId: "",
    eventTime: todayFormatted,
  };
  return (
    <Box sx={{ width: "100%", maxWidth: "1000px", mx: "auto" }}>
      <Fade in={true} timeout={500}>
        <Paper
          elevation={5}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "white",
          }}
        >
          <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Stack
                spacing={3}
                sx={{
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",

                    width: {
                      xs: "100%",
                      md: "auto",
                    },
                  }}
                >
                  <IconButton
                    onClick={handleAmountDecrease}
                    disabled={amount == "0"}
                    color="primary"
                    size="small"
                    sx={{
                      mr: 1,
                      mb: 1.5,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <MinusIcon fontSize="small" />
                  </IconButton>
                  <Box
                    sx={{
                      width: {
                        xs: "100%",
                      },
                    }}
                  >
                    <Typography>Select amount (kg)</Typography>
                    <NumberField
                      number={amount}
                      handleChange={handleAmountChange}
                      label="Amount"
                      adornment="kg"
                    />
                  </Box>
                  <IconButton
                    onClick={handleAmountIncrease}
                    color="primary"
                    size="small"
                    sx={{
                      ml: 1,
                      mb: 1.5,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <PlusIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Stack
                spacing={3}
                sx={{
                  width: "100%",
                  alignItems: {
                    md: "center",
                  },
                }}
              >
                <Box sx={{ width: { md: "100%" }, maxWidth: { md: "235px" } }}>
                  <Typography>Select berry kind</Typography>
                  <BerryKindSelect
                    berryKindsData={berryKindsData}
                    setState={setKind}
                    value={kind}
                  />
                </Box>
                <Box sx={{ width: { md: "100%" }, maxWidth: { md: "235px" } }}>
                  <Typography>Select employee</Typography>
                  <EmployeeSelectField
                    employeesData={employeesData}
                    setState={setEmployee}
                    value={selectedEmployeeId}
                  />
                </Box>
              </Stack>
            </Grid2>
            <Grid2 display="flex" justifyContent="center" width="100%">
              <Stack width="100%" alignItems="center">
                <Stack
                  sx={{
                    width: {
                      xs: "100%",
                      md: "33%",
                    },
                  }}
                >
                  <CreateButton<HarvestCreate>
                    data={{
                      kilograms: Number(amount),
                      employeeId: selectedEmployeeId,
                      berryTypeId: berryTypeData.id,
                      berryKindId: kind,
                    }}
                    onSuccess={() => {
                      handleReset();
                      toast.success("Harvest created successfully!");
                    }}
                    onError={(error) => {
                      toast.error(error.message);
                    }}
                    text={"Harvest"}
                    createMutation={createHarvestMutation}
                  />
                </Stack>
                <Divider
                  sx={{
                    mt: 4,
                    mb: 1,
                    width: {
                      xs: "100%",
                      md: "100%",
                    },
                    borderColor: "primary.main",
                  }}
                />
                <Box sx={{ textAlign: "center" }}>
                  <Link
                    component="button"
                    underline="hover"
                    onClick={handleBulkDialogOpen}
                  >
                    Use bulk input mode
                  </Link>
                </Box>
              </Stack>
            </Grid2>
          </Grid2>
        </Paper>
      </Fade>
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
          defaultTime={todayFormatted}
        />
      </BulkInputDialog>
    </Box>
  );
}
