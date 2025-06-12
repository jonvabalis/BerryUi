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
import useUpdateHarvest from "../../../api/harvests/useUpdateHarvest";
import useDeleteHarvest from "../../../api/harvests/useDeleteHarvest";
import useGetByDateHarvests, {
  HarvestDataLine,
} from "../../../api/harvests/useGetByDateHarvest";
import { getBerryType } from "../../../utils/berryTypeHelper";
import { Dayjs } from "dayjs";
import { BerryKind } from "../../../api/berryKinds/useGetAllByTypeBerryKind";
import { EmployeeData } from "../../../api/employees/useGetByIdEmployee";
import ConfirmationDialog from "../../Reusable/ConfirmationDialog";

interface HistoryDataHarvestTableProps {
  selectedDate: Dayjs;
  berryKindsData: BerryKind[] | undefined;
  employeesData: EmployeeData[] | undefined;
}

export const HistoryDataHarvestTable = ({
  selectedDate,
  berryKindsData,
  employeesData,
}: HistoryDataHarvestTableProps) => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [deleteConfirmWindowOpen, setConfirmWindowOpen] =
    useState<boolean>(false);
  const [rowToDelete, setRowToDelete] =
    useState<MRT_Row<HarvestDataLine> | null>(null);

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

  const columns = useMemo<MRT_ColumnDef<HarvestDataLine>[]>(
    () => [
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
      },
      {
        accessorKey: "kilograms",
        header: "Kilograms",
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
      },
      {
        accessorKey: "eventTime",
        header: "Event time",
        enableEditing: false,
      },
    ],
    [validationErrors, employeesSelection, berryKindsSelection]
  );

  const {
    data: fetchedHarvests = [],
    isError: isLoadingByDateHarvestError,
    isFetching: isFetchingByDateHarvest,
    isLoading: isLoadingByDateHarvest,
  } = useGetByDateHarvests(getBerryType().id, selectedDate);
  const { mutateAsync: updateHarvest, isPending: isUpdatingHarvest } =
    useUpdateHarvest(selectedDate);
  const { mutateAsync: deleteHarvest, isPending: isDeletingHarvest } =
    useDeleteHarvest(selectedDate);

  const handleSaveHarvest: MRT_TableOptions<HarvestDataLine>["onEditingRowSave"] =
    async ({ row, values, table }) => {
      const newValidationErrors = validateHarvest(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }

      const valuesWithHarvestId = {
        ...row.original,
        ...values,
        berryKindId: values.berryKindId === "null" ? null : values.berryKindId,
      };

      setValidationErrors({});
      await updateHarvest(valuesWithHarvestId);
      table.setEditingRow(null);
    };

  const openDeleteConfirmModal = (row: MRT_Row<HarvestDataLine>) => {
    setRowToDelete(row);
    setConfirmWindowOpen(true);
  };

  const harvestsFixed = useMemo(() => {
    return fetchedHarvests.map((harvest) => ({
      ...harvest,
      berryKindId: harvest.berryKindId ?? "null",
    }));
  }, [fetchedHarvests]);

  const table = useMaterialReactTable({
    columns,
    data: harvestsFixed,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableTopToolbar: false,
    enableEditing: true,
    enableColumnFilters: false,
    enableColumnActions: false,
    positionActionsColumn: "last",
    getRowId: (row) => row.harvestId,
    muiToolbarAlertBannerProps: isLoadingByDateHarvestError
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
    onEditingRowSave: handleSaveHarvest,
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
      isLoading: isLoadingByDateHarvest,
      isSaving: isUpdatingHarvest || isDeletingHarvest,
      showAlertBanner: isLoadingByDateHarvestError,
      showProgressBars: isFetchingByDateHarvest,
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <ConfirmationDialog
        dialogTitleText={"Harvest removal"}
        dialogContentText={"Do you really want to remove this harvest?"}
        cancelText={"Cancel"}
        submitText={"Delete"}
        dialogOpen={deleteConfirmWindowOpen}
        handleDialogClose={handleDeleteConfirmWindowClose}
        handleCancelPress={handleDeleteConfirmWindowClose}
        handleSubmitPress={() => {
          deleteHarvest(rowToDelete!.original.harvestId);
          handleDeleteConfirmWindowClose();
        }}
      />
    </>
  );
};

const validateRequired = (value: string) => !!value.length;
const validateKilograms = (value: number) => value > 0;

function validateHarvest(harvest: HarvestDataLine) {
  return {
    kilograms:
      !validateRequired(harvest.kilograms.toString()) ||
      isNaN(harvest.kilograms)
        ? "Please input kilogram value"
        : !validateKilograms(harvest.kilograms)
        ? "Please input positive value"
        : "",
  };
}

const createDropdownCell = (
  options: { value: string; text: string }[] | undefined,
  textIfNull: string
) => {
  return ({ cell }: { cell: MRT_Cell<HarvestDataLine, unknown> }) => {
    const optionId = cell.getValue<string>();
    if (optionId === "mixed") {
      return textIfNull;
    }
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
