import { useState, ChangeEvent, useEffect } from "react";
import { BerryKind } from "../../api/berryKinds/useGetAllByTypeBerryKind";
import { EmployeeData } from "../../api/employees/useGetByIdEmployee";
import { BerryKindSelect } from "./BerryKindSelectField";
import { NumberField } from "./NumberField";
import { EmployeeSelectField } from "../Harvest/EmployeeSelectField";
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
import { BulkSaleCreate } from "../../api/sales/useCreateBulkSale";

dayjs.extend(utc);
dayjs.extend(timezone);

interface SaleInputLineProps {
  berryKindsData: BerryKind[] | undefined;
  employeesData: EmployeeData[] | undefined;
  defaultEmployeeId: string;
  defaultTime: Date;
  defaultBerryCost: string;
  data?: BulkSaleCreate;
  itemIndex?: number;
  onChange?: (index: number, data: BulkSaleCreate) => void;
}

function SaleInputLineComponent({
  berryKindsData,
  employeesData,
  defaultBerryCost,
  defaultEmployeeId,
  defaultTime,
  data,
  itemIndex,
  onChange,
}: SaleInputLineProps) {
  const [amount, setAmount] = useState<string>("0");
  const [kind, setKind] = useState<string | null>(null);
  const [selectedEmployeeId, setEmployee] = useState<string>(defaultEmployeeId);
  const [selectedTime, setSelectedTime] = useState(defaultTime);
  const [price, setPrice] = useState<string>(defaultBerryCost);
  const [totalPrice, setTotalPrice] = useState<string>("0");
  const [selectedSaleType, setSaleType] = useState<number>(0);

  useEffect(() => {
    setAmount(data?.kilograms.toString() || "0");
    setKind(data?.berryKindId || null);
    setEmployee(data?.employeeId || defaultEmployeeId);
    setSelectedTime(data?.eventTime || defaultTime);
    setPrice(data?.pricePerKilo || defaultBerryCost);
    setTotalPrice(data?.totalPrice || "0");
    setSaleType(data?.saleType || 0);
  }, [data, defaultEmployeeId, defaultTime, defaultBerryCost]);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);

    if (onChange && typeof itemIndex === "number") {
      onChange(itemIndex, {
        kilograms: Number(value),
        berryKindId: kind,
        berryTypeId: "67cc8b9d-0376-4726-b69d-01eb869bba2c",
        employeeId: selectedEmployeeId,
        eventTime: selectedTime,
        pricePerKilo: price,
        totalPrice: totalPrice,
        saleType: selectedSaleType,
      });
    }
  };

  const handleTimeChange = (newTime: Dayjs | null) => {
    const updatedSelectedTime = newTime ? dayjsToUTCDate(newTime) : defaultTime;
    setSelectedTime(updatedSelectedTime);

    if (onChange && typeof itemIndex === "number") {
      onChange(itemIndex, {
        kilograms: Number(amount),
        berryKindId: kind,
        berryTypeId: "67cc8b9d-0376-4726-b69d-01eb869bba2c",
        employeeId: selectedEmployeeId,
        eventTime: updatedSelectedTime,
        pricePerKilo: price,
        totalPrice: totalPrice,
        saleType: selectedSaleType,
      });
    }
  };

  const handleKindChange = (berryKindId: string) => {
    setKind(berryKindId === "null" ? null : berryKindId);

    if (onChange && typeof itemIndex === "number") {
      onChange(itemIndex, {
        kilograms: Number(amount),
        berryKindId: berryKindId === "null" ? null : berryKindId,
        berryTypeId: "67cc8b9d-0376-4726-b69d-01eb869bba2c",
        employeeId: selectedEmployeeId,
        eventTime: selectedTime,
        pricePerKilo: price,
        totalPrice: totalPrice,
        saleType: selectedSaleType,
      });
    }
  };

  const handleEmployeeChange = (employeeId: string) => {
    if (onChange && typeof itemIndex === "number") {
      onChange(itemIndex, {
        kilograms: Number(amount),
        berryKindId: kind,
        berryTypeId: "67cc8b9d-0376-4726-b69d-01eb869bba2c",
        employeeId: employeeId,
        eventTime: selectedTime,
        pricePerKilo: price,
        totalPrice: totalPrice,
        saleType: selectedSaleType,
      });
    }
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);

    if (onChange && typeof itemIndex === "number") {
      onChange(itemIndex, {
        kilograms: Number(amount),
        berryKindId: kind,
        berryTypeId: "67cc8b9d-0376-4726-b69d-01eb869bba2c",
        employeeId: selectedEmployeeId,
        eventTime: selectedTime,
        pricePerKilo: value,
        totalPrice: totalPrice,
        saleType: selectedSaleType,
      });
    }
  };

  const handleTotalPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);

    if (onChange && typeof itemIndex === "number") {
      onChange(itemIndex, {
        kilograms: Number(amount),
        berryKindId: kind,
        berryTypeId: "67cc8b9d-0376-4726-b69d-01eb869bba2c",
        employeeId: selectedEmployeeId,
        eventTime: selectedTime,
        pricePerKilo: price,
        totalPrice: value,
        saleType: selectedSaleType,
      });
    }
  };

  const handleSaleTypeChange = (saleType: number) => {
    if (onChange && typeof itemIndex === "number") {
      onChange(itemIndex, {
        kilograms: Number(amount),
        berryKindId: kind,
        berryTypeId: "67cc8b9d-0376-4726-b69d-01eb869bba2c",
        employeeId: selectedEmployeeId,
        eventTime: selectedTime,
        pricePerKilo: price,
        totalPrice: totalPrice,
        saleType: saleType,
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
        <Grid2 container spacing={1} size={{ xs: 12 }}>
          <Grid2 container size={{ xs: 12, sm: 4 }}>
            <NumberField
              number={amount}
              handleChange={handleAmountChange}
              label="Amount"
              adornment="kg"
            />
          </Grid2>
          <Grid2 container size={{ xs: 12, sm: 4 }}>
            <BerryKindSelect
              berryKindsData={berryKindsData}
              setState={setKind}
              value={kind}
              onChange={handleKindChange}
            />
          </Grid2>
          <Grid2 container size={{ xs: 12, sm: 4 }}>
            <BerryKindSelect
              berryKindsData={berryKindsData}
              setState={setKind}
              value={kind}
              onChange={handleKindChange}
            />
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
}

const SaleInputLine = React.memo(SaleInputLineComponent);

export default SaleInputLine;
