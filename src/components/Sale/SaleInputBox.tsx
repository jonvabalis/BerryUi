import { Box, Divider, Grid2, Link, Stack, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { BerryKindSelect } from "./BerryKindSelectField";
import { SaleTypeSelect } from "./SaleTypeSelectField";
import { CreateButton } from "./CreateButton";
import SaleInputBar from "./SaleInputBar";
import { BerryKind } from "../../api/berryKinds/useGetAllByTypeBerryKind";
import { useToast } from "../../hooks/useToast";
import { SALETYPE_DATA } from "./SaleTypeData";
import { SaleCreate, useCreateSale } from "../../api/sales/useCreateSale";
import { BoxPaper } from "../Reusable/BoxPaper";
import { BerryType } from "../Themes/BerryData";
import {
  BulkSaleCreate,
  useCreateBulkSale,
} from "../../api/sales/useCreateBulkSale";
import BulkInputDialog from "../Reusable/BulkInputDialog";
import { SaleInputLine } from "./SaleInputLine";
import { EmployeeData } from "../../api/employees/useGetByIdEmployee";

interface SaleInputBoxProps {
  berryTypeData: BerryType;
  berryKindsData: BerryKind[] | undefined;
  defaultEmployeeId: string;
  defaultBerryCost: string;
  employeesData: EmployeeData[] | undefined;
}

export default function SaleInputBox({
  berryTypeData,
  berryKindsData,
  defaultBerryCost,
  defaultEmployeeId,
  employeesData,
}: SaleInputBoxProps) {
  const toast = useToast();
  const createSaleMutation = useCreateSale();
  const createBulkSaleMutation = useCreateBulkSale();

  const [amount, setAmount] = useState<string>("0");
  const [price, setPrice] = useState<string>(defaultBerryCost);
  const [totalPrice, setTotalPrice] = useState<string>("0");

  const [kind, setKind] = useState<string | null>(null);
  const [saleType, setSaleType] = useState<number>(0);

  const [bulkDialogOpen, setBulkDialogOpen] = useState<boolean>(false);

  const handleBulkDialogOpen = () => setBulkDialogOpen(true);
  const handleBulkDialogClose = useCallback(() => {
    setBulkDialogOpen(false);
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

  const emptySale = useMemo<BulkSaleCreate>(() => {
    return {
      kilograms: 0,
      employeeId: "",
      berryTypeId: "",
      berryKindId: "",
      eventTime: todayFormatted,
      pricePerKilo: "6",
      totalPrice: "0",
      saleType: 0,
    };
  }, [todayFormatted]);

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
          mt: 4,
          justifyContent: "center",
        }}
      >
        <Stack width="100%" alignItems="center">
          <Stack
            sx={{
              width: {
                xs: "100%",
                md: "33%",
              },
            }}
          >
            <CreateButton<SaleCreate>
              data={{
                kilograms: Number(amount),
                pricePerKilo: Number(price),
                totalPrice: Number(totalPrice),
                employeeId: defaultEmployeeId,
                saleType: Number(saleType),
                berryTypeId: berryTypeData.id,
                berryKindId: kind,
              }}
              onSuccess={() => {
                toast.success("Sale created successfully!");
              }}
              text={"Sale"}
              createMutation={createSaleMutation}
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
      <BulkInputDialog<BulkSaleCreate>
        key={`bulksale-${todayFormatted.toISOString()}`}
        open={bulkDialogOpen}
        onClose={handleBulkDialogClose}
        title="Bulk sale input"
        defaultItem={emptySale}
        addButtonText="Add another sale"
        itemLabel="Sale"
        createMutation={createBulkSaleMutation}
        toastSuccess={"Sales created successfully!"}
      >
        <SaleInputLine
          berryTypeId={berryTypeData.id}
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
