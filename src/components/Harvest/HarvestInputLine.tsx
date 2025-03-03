import { useState, ChangeEvent } from "react";
import { BerryKind } from "../../api/berryKinds/useGetAllByTypeBerryKind";
import { EmployeeData } from "../../api/employees/useGetByIdEmployee";
import { GridContainer } from "../Reusable/GridContainer";
import { BerryKindSelect } from "../Sale/BerryKindSelectField";
import { NumberField } from "../Sale/NumberField";
import { EmployeeSelectField } from "./EmployeeSelectField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface HarvestInputLineProps {
  berryKindsData: BerryKind[] | undefined;
  employeesData: EmployeeData[] | undefined;
  defaultEmployeeId: string;
  currentDate: Date;
}

export default function HarvestInputLine({
  berryKindsData,
  employeesData,
  defaultEmployeeId,
}: HarvestInputLineProps) {
  const [amount, setAmount] = useState<string>("0");
  const [kind, setKind] = useState<string>("Mixed");
  const [selectedEmployeeId, setEmployee] = useState<string>(defaultEmployeeId);
  const [selectedTime, setSelectedTime] = useState(dayjs("00:00", "HH:mm"));

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
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
        />
      </GridContainer>
      <GridContainer span={3}>
        <EmployeeSelectField
          employeesData={employeesData}
          setState={setEmployee}
          value={selectedEmployeeId}
        />
      </GridContainer>
      <GridContainer span={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Select Time"
            value={selectedTime}
            onChange={(newValue) =>
              setSelectedTime(newValue ?? dayjs("00:00", "HH:mm"))
            }
            format="HH:mm"
          />
        </LocalizationProvider>
      </GridContainer>
    </GridContainer>
  );
}
