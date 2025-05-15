import { Box, Divider, Grid2, Link, Stack } from "@mui/material";
import { BoxPaper } from "../Reusable/BoxPaper";
import {
  BulkHarvestCreate,
  useCreateBulkHarvest,
} from "../../api/harvests/useCreateBulkHarvest";
import { useCallback, useMemo, useState } from "react";
import { HarvestInputLine } from "../Harvest/HarvestInputLine";
import BulkInputDialog from "../Reusable/BulkInputDialog";
import { BerryType } from "../../api/berryTypes/useGetByNameBerryType";
import { BerryKind } from "../../api/berryKinds/useGetAllByTypeBerryKind";
import { EmployeeData } from "../../api/employees/useGetByIdEmployee";
import {
  BulkSaleCreate,
  useCreateBulkSale,
} from "../../api/sales/useCreateBulkSale";
import { SaleInputLine } from "../Sale/SaleInputLine";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface HistoryBulkInputBoxProps {
  berryTypeData: BerryType;
  berryKindsData: BerryKind[] | undefined;
  employeesData: EmployeeData[] | undefined;
  defaultEmployeeId: string;
  selectedDate: Dayjs;
}

export default function HistoryBulkInputBox({
  berryTypeData,
  berryKindsData,
  employeesData,
  defaultEmployeeId,
  selectedDate,
}: HistoryBulkInputBoxProps) {
  const createBulkHarvestMutation = useCreateBulkHarvest();
  const createBulkSaleMutation = useCreateBulkSale();

  const [bulkHarvestDialogOpen, setBulkHarvestDialogOpen] = useState(false);
  const [bulkSaleDialogOpen, setBulkSaleDialogOpen] = useState(false);

  const handleBulkHarvestDialogOpen = () => setBulkHarvestDialogOpen(true);
  const handleBulkSaleDialogOpen = () => setBulkSaleDialogOpen(true);

  const handleBulkHarvestDialogClose = useCallback(() => {
    setBulkHarvestDialogOpen(false);
  }, []);
  const handleBulkSaleDialogClose = useCallback(() => {
    setBulkSaleDialogOpen(false);
  }, []);

  const selectedDay = useMemo(() => {
    const selectedTimeInUTC = selectedDate.utc();
    return new Date(
      Date.UTC(
        selectedTimeInUTC.year(),
        selectedTimeInUTC.month(),
        selectedTimeInUTC.date(),
        0,
        0,
        0,
        0
      )
    );
  }, [selectedDate]);

  const emptyHarvest = useMemo<BulkHarvestCreate>(() => {
    return {
      kilograms: 0,
      employeeId: "",
      berryTypeId: "",
      berryKindId: "",
      eventTime: selectedDay,
    };
  }, [selectedDay]);

  const emptySale = useMemo<BulkSaleCreate>(() => {
    return {
      kilograms: 0,
      employeeId: "",
      berryTypeId: "",
      berryKindId: "",
      eventTime: selectedDay,
      pricePerKilo: "6",
      totalPrice: "0",
      saleType: 0,
    };
  }, [selectedDay]);

  return (
    <BoxPaper>
      <Grid2
        container
        spacing={1}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Grid2 display="flex" justifyContent="center" width="100%">
          <Stack width="100%" alignItems="center">
            <Box sx={{ textAlign: "center" }}>
              <Link
                component="button"
                underline="hover"
                onClick={handleBulkSaleDialogOpen}
              >
                Use bulk sale input mode
              </Link>
            </Box>
            <Divider
              sx={{
                my: 1,
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
                onClick={handleBulkHarvestDialogOpen}
              >
                Use bulk harvest input mode
              </Link>
            </Box>
          </Stack>
        </Grid2>
      </Grid2>
      <BulkInputDialog<BulkHarvestCreate>
        open={bulkHarvestDialogOpen}
        onClose={handleBulkHarvestDialogClose}
        title="Bulk harvest input"
        defaultItem={emptyHarvest}
        addButtonText="Add another harvest"
        itemLabel="Harvest"
        createMutation={createBulkHarvestMutation}
        toastSuccess={"Harvests created successfully!"}
      >
        <HarvestInputLine
          berryKindsData={berryKindsData}
          employeesData={employeesData}
          defaultEmployeeId={defaultEmployeeId}
          defaultTime={selectedDay}
        />
      </BulkInputDialog>
      <BulkInputDialog<BulkSaleCreate>
        open={bulkSaleDialogOpen}
        onClose={handleBulkSaleDialogClose}
        title="Bulk sale input"
        defaultItem={emptySale}
        addButtonText="Add another sale"
        itemLabel="Sale"
        createMutation={createBulkSaleMutation}
        toastSuccess={"Sales created successfully!"}
      >
        <SaleInputLine
          berryKindsData={berryKindsData}
          employeesData={employeesData}
          defaultEmployeeId={defaultEmployeeId}
          defaultTime={selectedDay}
          defaultBerryCost={"6"}
        />
      </BulkInputDialog>
    </BoxPaper>
  );
}
