import { Box, Divider, Grid2, Link, Stack } from "@mui/material";
import { BoxPaper } from "../Reusable/BoxPaper";
import {
  BulkHarvestCreate,
  useCreateBulkHarvest,
} from "../../api/harvests/useCreateBulkHarvest";
import { useCallback, useMemo, useState } from "react";
import HarvestInputLine from "../Harvest/HarvestInputLine";
import BulkInputDialog from "../Reusable/BulkInputDialog";
import { BerryType } from "../../api/berryTypes/useGetByNameBerryType";
import { BerryKind } from "../../api/berryKinds/useGetAllByTypeBerryKind";
import { EmployeeData } from "../../api/employees/useGetByIdEmployee";
import {
  BulkSaleCreate,
  useCreateBulkSale,
} from "../../api/sales/useCreateBulkSale";
import SaleInputLine from "../Sale/SaleInputLine";

interface HistoryBulkInputBoxProps {
  berryTypeData: BerryType;
  berryKindsData: BerryKind[] | undefined;
  employeesData: EmployeeData[] | undefined;
  defaultEmployeeId: string;
}

export default function HistoryBulkInputBox({
  berryTypeData,
  berryKindsData,
  employeesData,
  defaultEmployeeId,
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

  const todayFormatted = useMemo(() => {
    const today = new Date();
    return new Date(
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
  }, []);

  const emptyHarvest = useMemo<BulkHarvestCreate>(() => {
    return {
      kilograms: 0,
      employeeId: "",
      berryTypeId: "",
      berryKindId: "",
      eventTime: todayFormatted,
    };
  }, [todayFormatted]);

  const emptySale = useMemo<BulkSaleCreate>(() => {
    return {
      kilograms: 0,
      employeeId: "",
      berryTypeId: "",
      berryKindId: "",
      eventTime: todayFormatted,
      pricePerKilo: "0",
      totalPrice: "0",
      saleType: 0,
    };
  }, [todayFormatted]);

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
          defaultTime={todayFormatted}
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
          defaultTime={todayFormatted}
          defaultBerryCost={"6"}
        />
      </BulkInputDialog>
    </BoxPaper>
  );
}
