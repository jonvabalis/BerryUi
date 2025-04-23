import { useState, ChangeEvent, useEffect } from "react";
import { BerryKind } from "../../api/berryKinds/useGetAllByTypeBerryKind";
import { EmployeeData } from "../../api/employees/useGetByIdEmployee";
import { GridContainer } from "../Reusable/GridContainer";
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

dayjs.extend(utc);
dayjs.extend(timezone);

interface HarvestInputLineProps {
  berryKindsData: BerryKind[] | undefined;
  employeesData: EmployeeData[] | undefined;
  defaultEmployeeId: string;
  defaultTime: Date;
  data?: BulkHarvestCreate;
  onChange?: (data: BulkHarvestCreate) => void;
}

export default function HarvestInputLine({
  berryKindsData,
  employeesData,
  defaultEmployeeId,
  defaultTime,
  data,
  onChange,
}: HarvestInputLineProps) {
  const [amount, setAmount] = useState<string>("0");
  const [kind, setKind] = useState<string | null>(null);
  const [selectedEmployeeId, setEmployee] = useState<string>(defaultEmployeeId);
  const [selectedTime, setSelectedTime] = useState(defaultTime);

  useEffect(() => {
    setAmount(data?.kilograms.toString() || "0");
    setKind(data?.berryKindId || null);
    setEmployee(data?.employeeId || defaultEmployeeId);
    setSelectedTime(data?.eventTime || defaultTime);
  }, [data]);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);

    if (onChange) {
      onChange({
        kilograms: Number(value),
        berryKindId: kind,
        berryTypeId: "67cc8b9d-0376-4726-b69d-01eb869bba2c",
        employeeId: selectedEmployeeId,
        eventTime: selectedTime,
      });
    }
  };

  const handleTimeChange = (newTime: Dayjs | null) => {
    const updatedSelectedTime = newTime ? dayjsToUTCDate(newTime) : defaultTime;
    setSelectedTime(updatedSelectedTime);

    if (onChange) {
      onChange({
        kilograms: Number(amount),
        berryKindId: kind,
        berryTypeId: "67cc8b9d-0376-4726-b69d-01eb869bba2c",
        employeeId: selectedEmployeeId,
        eventTime: updatedSelectedTime,
      });
    }
  };

  const handleKindChange = (berryKindId: string) => {
    setKind(berryKindId === "null" ? null : berryKindId);

    onChange?.({
      kilograms: Number(amount),
      berryKindId: berryKindId === "null" ? null : berryKindId,
      berryTypeId: "67cc8b9d-0376-4726-b69d-01eb869bba2c",
      employeeId: selectedEmployeeId,
      eventTime: selectedTime,
    });
  };

  const handleEmployeeChange = (employeeId: string) => {
    onChange?.({
      kilograms: Number(amount),
      berryKindId: kind,
      berryTypeId: "67cc8b9d-0376-4726-b69d-01eb869bba2c",
      employeeId: employeeId,
      eventTime: selectedTime,
    });
  };

  return (
    <GridContainer span={12}>
      <GridContainer span={3}>
        <NumberField
          number={amount}
          handleChange={handleAmountChange}
          label="Amount"
          adornment="kg"
        />
      </GridContainer>
      <GridContainer span={3}>
        <BerryKindSelect
          berryKindsData={berryKindsData}
          setState={setKind}
          value={kind}
          onChange={handleKindChange}
        />
      </GridContainer>
      <GridContainer span={3}>
        <EmployeeSelectField
          employeesData={employeesData}
          setState={setEmployee}
          value={selectedEmployeeId}
          onChange={handleEmployeeChange}
        />
      </GridContainer>
      <GridContainer span={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Select Time"
            value={dayjs(selectedTime)}
            onChange={handleTimeChange}
            ampm={false}
            timezone="UTC"
            sx={{
              mt: 1.25,
              width: { xs: "100%", md: "auto" },
              minWidth: { xs: "100%", md: 200 },
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
      </GridContainer>
    </GridContainer>
  );
}
