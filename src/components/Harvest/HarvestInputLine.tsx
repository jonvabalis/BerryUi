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

dayjs.extend(utc);
dayjs.extend(timezone);

interface HarvestInputLineProps {
  berryKindsData: BerryKind[] | undefined;
  employeesData: EmployeeData[] | undefined;
  defaultEmployeeId: string;
  currentDate: Date;
  data?: BulkHarvestCreate;
  onChange?: (data: BulkHarvestCreate) => void;
}

export default function HarvestInputLine({
  berryKindsData,
  employeesData,
  defaultEmployeeId,
  currentDate,
  data,
  onChange,
}: HarvestInputLineProps) {
  const hour = 2;
  const [amount, setAmount] = useState<string>("0");
  const [kind, setKind] = useState<string>("Mixed");
  const [selectedEmployeeId, setEmployee] = useState<string>(defaultEmployeeId);
  const [selectedTime, setSelectedTime] = useState(
    dayjs().hour(hour).minute(0)
  );

  useEffect(() => {
    setAmount(data?.kilograms.toString() || "0");
    setKind(data?.berryKindId || "");
    setEmployee(data?.employeeId || defaultEmployeeId);
    setSelectedTime(
      data
        ? dayjs()
            .hour(data.eventTime.getHours() + hour)
            .minute(data.eventTime.getMinutes())
        : dayjs().hour(hour).minute(0)
    );
  }, [data]);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);

    if (onChange) {
      onChange({
        kilograms: Number(value),
        berryKindId: kind == "Mixed" ? null : kind,
        berryTypeId: "67cc8b9d-0376-4726-b69d-01eb869bba2c",
        employeeId: selectedEmployeeId,
        eventTime: selectedTime.toDate(),
      });
    }
  };

  const handleTimeChange = (newTime: Dayjs | null) => {
    setSelectedTime(newTime ?? dayjs().hour(hour).minute(0));

    if (onChange) {
      onChange({
        kilograms: Number(amount),
        berryKindId: kind == "Mixed" ? null : kind,
        berryTypeId: "67cc8b9d-0376-4726-b69d-01eb869bba2c",
        employeeId: selectedEmployeeId,
        eventTime: (newTime ?? dayjs().hour(hour).minute(0)).toDate(),
      });
    }
  };

  const handleKindChange = (berryKindId: string) => {
    setKind(berryKindId);

    onChange?.({
      kilograms: Number(amount),
      berryKindId: berryKindId == "Mixed" ? null : kind,
      berryTypeId: "67cc8b9d-0376-4726-b69d-01eb869bba2c",
      employeeId: selectedEmployeeId,
      eventTime: selectedTime.toDate(),
    });
  };

  const handleEmployeeChange = (employeeId: string) => {
    onChange?.({
      kilograms: Number(amount),
      berryKindId: kind == "Mixed" ? null : kind,
      berryTypeId: "67cc8b9d-0376-4726-b69d-01eb869bba2c",
      employeeId: employeeId,
      eventTime: selectedTime.toDate(),
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
            value={selectedTime}
            onChange={handleTimeChange}
            ampm={false}
            timezone="Etc/UTC"
          />
        </LocalizationProvider>
      </GridContainer>
    </GridContainer>
  );
}
