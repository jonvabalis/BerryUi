import { useState, ChangeEvent, useEffect } from "react";
import { BerryKind } from "../../api/berryKinds/useGetAllByTypeBerryKind";
import { EmployeeData } from "../../api/employees/useGetByIdEmployee";
import { BerryKindSelect } from "../Sale/BerryKindSelectField";
import { NumberField } from "../Sale/NumberField";
import { EmployeeSelectField } from "./EmployeeSelectField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { BulkHarvestCreate } from "../../api/harvests/useCreateBulkHarvest";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { dayjsToUTCDate } from "../../utils/utcHelper";
import { Box, Grid2 } from "@mui/material";
import React from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

interface HarvestInputLineProps {
  berryTypeId: string;
  berryKindsData: BerryKind[] | undefined;
  employeesData: EmployeeData[] | undefined;
  defaultEmployeeId: string;
  defaultTime: Date;
  data?: BulkHarvestCreate;
  itemIndex?: number;
  onChange?: (index: number, data: BulkHarvestCreate) => void;
}

export const HarvestInputLine = React.memo(
  ({
    berryTypeId,
    berryKindsData,
    employeesData,
    defaultEmployeeId,
    defaultTime,
    data,
    itemIndex,
    onChange,
  }: HarvestInputLineProps) => {
    const [amount, setAmount] = useState<string>("0");
    const [kind, setKind] = useState<string | null>(null);
    const [selectedEmployeeId, setEmployee] =
      useState<string>(defaultEmployeeId);
    const [selectedTime, setSelectedTime] = useState(defaultTime);

    useEffect(() => {
      setAmount(data?.kilograms.toString() || "0");
      setKind(data?.berryKindId || null);
      setEmployee(data?.employeeId || defaultEmployeeId);
      setSelectedTime(data?.eventTime || defaultTime);
    }, [data, defaultEmployeeId, defaultTime]);

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setAmount(value);

      if (onChange && typeof itemIndex === "number") {
        onChange(itemIndex, {
          kilograms: Number(value),
          berryKindId: kind,
          berryTypeId: berryTypeId,
          employeeId: selectedEmployeeId,
          eventTime: selectedTime,
        });
      }
    };

    const handleTimeChange = (newTime: Dayjs | null) => {
      const updatedSelectedTime = newTime
        ? dayjsToUTCDate(newTime)
        : defaultTime;
      setSelectedTime(updatedSelectedTime);

      if (onChange && typeof itemIndex === "number") {
        onChange(itemIndex, {
          kilograms: Number(amount),
          berryKindId: kind,
          berryTypeId: berryTypeId,
          employeeId: selectedEmployeeId,
          eventTime: updatedSelectedTime,
        });
      }
    };

    const handleKindChange = (berryKindId: string) => {
      setKind(berryKindId === "null" ? null : berryKindId);

      if (onChange && typeof itemIndex === "number") {
        onChange(itemIndex, {
          kilograms: Number(amount),
          berryKindId: berryKindId === "null" ? null : berryKindId,
          berryTypeId: berryTypeId,
          employeeId: selectedEmployeeId,
          eventTime: selectedTime,
        });
      }
    };

    const handleEmployeeChange = (employeeId: string) => {
      if (onChange && typeof itemIndex === "number") {
        onChange(itemIndex, {
          kilograms: Number(amount),
          berryKindId: kind,
          berryTypeId: berryTypeId,
          employeeId: employeeId,
          eventTime: selectedTime,
        });
      }
    };

    return (
      <Box sx={{ width: "100%", maxWidth: "1000px", mx: "auto" }}>
        <Grid2 container spacing={1}>
          <Grid2 container spacing={1} size={{ xs: 12, sm: 6 }}>
            <Grid2 container size={{ xs: 12, md: 6 }}>
              <NumberField
                number={amount}
                handleChange={handleAmountChange}
                label="Amount"
                adornment="kg"
              />
            </Grid2>
            <Grid2 container size={{ xs: 12, md: 6 }}>
              <BerryKindSelect
                berryKindsData={berryKindsData}
                setState={setKind}
                value={kind}
                onChange={handleKindChange}
              />
            </Grid2>
          </Grid2>
          <Grid2 container spacing={1} size={{ xs: 12, sm: 6 }}>
            <Grid2 container size={{ xs: 12, md: 6 }}>
              <EmployeeSelectField
                employeesData={employeesData}
                setState={setEmployee}
                value={selectedEmployeeId}
                onChange={handleEmployeeChange}
              />
            </Grid2>
            <Grid2 container size={{ xs: 12, md: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Select Time"
                  value={dayjs(selectedTime)}
                  onChange={handleTimeChange}
                  ampm={false}
                  timezone="UTC"
                  sx={{
                    mt: 1.25,
                    width: { xs: "100%" },
                    minWidth: { xs: "100%" },
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.secondary",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.secondary",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "primary.main",
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid2>
          </Grid2>
        </Grid2>
      </Box>
    );
  }
);
