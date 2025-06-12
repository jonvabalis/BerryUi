import { useCallback, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_Cell,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton, MenuItem, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getBerryType } from "../../../utils/berryTypeHelper";
import { Dayjs } from "dayjs";
import { BerryKind } from "../../../api/berryKinds/useGetAllByTypeBerryKind";
import { EmployeeData } from "../../../api/employees/useGetByIdEmployee";
import { SaleType } from "../../Sale/SaleTypeData";
import useGetByDateSales, {
  SaleDataLine,
} from "../../../api/sales/useGetByDateSale";
import useUpdateSale from "../../../api/sales/useUpdateSale";
import useDeleteSale from "../../../api/sales/useDeleteSale";
import ConfirmationDialog from "../../Reusable/ConfirmationDialog";

interface HistoryDataSaleTableProps {
  selectedDate: Dayjs;
  berryKindsData: BerryKind[] | undefined;
  employeesData: EmployeeData[] | undefined;
  saleTypeData: SaleType[];
}

export const HistoryDataSaleTable = ({
  selectedDate,
  berryKindsData,
  employeesData,
  saleTypeData,
}: HistoryDataSaleTableProps) => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [deleteConfirmWindowOpen, setConfirmWindowOpen] =
    useState<boolean>(false);
  const [rowToDelete, setRowToDelete] = useState<MRT_Row<SaleDataLine> | null>(
    null
  );

  const handleDeleteConfirmWindowClose = useCallback(() => {
    setConfirmWindowOpen(false);
  }, []);

  const employeesSelection = useMemo(
    () =>
      employeesData?.map((employee) => ({
        value: employee.id,
        text: `${employee.firstName} ${employee.lastName}`,
      })),
    [employeesData]
  );

  const berryKindsSelection = useMemo(
    () => [
      { value: "null", text: "Mixed" },
      ...(berryKindsData?.map((berryKind) => ({
        value: berryKind.id,
        text: berryKind.kind,
      })) ?? []),
    ],
    [berryKindsData]
  );

  const saleTypeSelection = useMemo(
    () =>
      saleTypeData.map((saleType) => ({
        value: saleType.value.toString(),
        text: saleType.text,
      })),
    [saleTypeData]
  );

  const columns = useMemo<MRT_ColumnDef<SaleDataLine>[]>(
    () => [
      {
        accessorKey: "kilograms",
        header: "Kg",
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          error: !!validationErrors?.kilograms,
          helperText: validationErrors?.kilograms,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              kilograms: undefined,
            }),
          onChange: (event) => {
            const value = parseFloat(event.target.value);
            if (!isNaN(value)) {
              event.target.value = Math.max(0, value).toString();
            }
          },
        },
        size: 20,
        minSize: 10,
      },
      {
        accessorKey: "pricePerKilo",
        header: "Price",
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          error: !!validationErrors?.pricePerKilo,
          helperText: validationErrors?.pricePerKilo,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              pricePerKilo: undefined,
            }),
          onChange: (event) => {
            const value = parseFloat(event.target.value);
            if (!isNaN(value)) {
              event.target.value = Math.max(0, value).toString();
            }
          },
        },
        size: 20,
        minSize: 10,
      },
      {
        accessorKey: "totalPrice",
        header: "Total price",
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          error: !!validationErrors?.totalPrice,
          helperText: validationErrors?.totalPrice,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              totalPrice: undefined,
            }),
          onChange: (event) => {
            const value = parseFloat(event.target.value);
            if (!isNaN(value)) {
              event.target.value = Math.max(0, value).toString();
            }
          },
        },
        size: 20,
        minSize: 10,
      },
      {
        accessorKey: "saleType",
        Cell: createDropdownCell(saleTypeSelection, "Unknown type"),
        header: "Sale type",
        editVariant: "select",
        editSelectOptions: saleTypeSelection,
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationErrors?.saleType,
          helperText: validationErrors?.saleType,
          children: renderDropdownOptions(saleTypeSelection),
        },
        size: 20,
      },
      {
        accessorKey: "berryKindId",
        Cell: createDropdownCell(berryKindsSelection, "Unknown berry"),
        header: "Berry kind",
        editVariant: "select",
        editSelectOptions: berryKindsSelection,
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationErrors?.berryKindId,
          helperText: validationErrors?.berryKindId,
          children: renderDropdownOptions(berryKindsSelection),
        },
        size: 20,
      },
      {
        accessorKey: "employeeId",
        Cell: createDropdownCell(employeesSelection, "Unknown employee"),
        header: "Employee",
        editVariant: "select",
        editSelectOptions: employeesSelection,
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationErrors?.employeeId,
          helperText: validationErrors?.employeeId,
          children: renderDropdownOptions(employeesSelection),
        },
        size: 20,
      },
      {
        accessorKey: "eventTime",
        header: "Event time",
        enableEditing: false,
        size: 20,
      },
    ],
    [
      validationErrors,
      employeesSelection,
      berryKindsSelection,
      saleTypeSelection,
    ]
  );

  const {
    data: fetchedSales = [],
    isError: isLoadingByDateSaleError,
    isFetching: isFetchingByDateSale,
    isLoading: isLoadingByDateSale,
  } = useGetByDateSales(getBerryType().id, selectedDate);
  const { mutateAsync: updateSale, isPending: isUpdatingSale } =
    useUpdateSale(selectedDate);
  const { mutateAsync: deleteSale, isPending: isDeletingSale } =
    useDeleteSale(selectedDate);

  const handleSaveSale: MRT_TableOptions<SaleDataLine>["onEditingRowSave"] =
    async ({ row, values, table }) => {
      const newValidationErrors = validateSale(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }

      const valuesWithSaleId = {
        ...row.original,
        ...values,
        berryKindId: values.berryKindId === "null" ? null : values.berryKindId,
        saleType: Number(values.saleType),
      };

      setValidationErrors({});
      await updateSale(valuesWithSaleId);
      table.setEditingRow(null);
    };

  const openDeleteConfirmModal = (row: MRT_Row<SaleDataLine>) => {
    setRowToDelete(row);
    setConfirmWindowOpen(true);
  };

  const salesFixed = useMemo(() => {
    return fetchedSales.map((sale) => ({
      ...sale,
      berryKindId: sale.berryKindId ?? "null",
      saleType: sale.saleType.toString(),
    }));
  }, [fetchedSales]);

  const table = useMaterialReactTable({
    columns,
    data: salesFixed,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableTopToolbar: false,
    enableEditing: true,
    enableColumnFilters: false,
    enableColumnActions: false,
    positionActionsColumn: "last",
    getRowId: (row) => row.saleId,
    muiToolbarAlertBannerProps: isLoadingByDateSaleError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "400px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveSale,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),

    state: {
      isLoading: isLoadingByDateSale,
      isSaving: isUpdatingSale || isDeletingSale,
      showAlertBanner: isLoadingByDateSaleError,
      showProgressBars: isFetchingByDateSale,
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <ConfirmationDialog
        dialogTitleText={"Sale removal"}
        dialogContentText={"Do you really want to remove this sale?"}
        cancelText={"Cancel"}
        submitText={"Delete"}
        dialogOpen={deleteConfirmWindowOpen}
        handleDialogClose={handleDeleteConfirmWindowClose}
        handleCancelPress={handleDeleteConfirmWindowClose}
        handleSubmitPress={() => {
          deleteSale(rowToDelete!.original.saleId);
          handleDeleteConfirmWindowClose();
        }}
      />
    </>
  );
};

const validateRequired = (value: string) => !!value.length;
const validateKilograms = (value: number) => value > 0;

function validateSale(sale: SaleDataLine) {
  return {
    kilograms:
      !validateRequired(sale.kilograms.toString()) || isNaN(sale.kilograms)
        ? "Please input kilogram value"
        : !validateKilograms(sale.kilograms)
        ? "Please input positive value"
        : "",
  };
}

const createDropdownCell = (
  options: { value: string; text: string }[] | undefined,
  textIfNull: string
) => {
  return ({ cell }: { cell: MRT_Cell<any, unknown> }) => {
    const optionId = cell.getValue<string>();
    const option = options?.find((opt) => opt.value === optionId);

    return option ? option.text : textIfNull;
  };
};

const renderDropdownOptions = (
  options: { value: string; text: string }[] | undefined
) => {
  return options?.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.text}
    </MenuItem>
  ));
};
