import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { BerryKind } from "../../api/berryKinds/useGetAllByTypeBerryKind";
import { ChangeEvent } from "react";

interface BerryKindSelectFieldProps {
  berryKindsData: BerryKind[] | undefined;
  value: string | null;
  setState: React.Dispatch<React.SetStateAction<string | null>>;
  onChange?: (e: string) => void;
}

export function BerryKindSelect({
  berryKindsData,
  value,
  setState,
  onChange,
}: BerryKindSelectFieldProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">Kind</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value === null ? "null" : value}
        onChange={handleChange}
        label="BerryKind"
      >
        <MenuItem key={0} value={"null"}>
          Mixed
        </MenuItem>
        {berryKindsData?.map((berryKind) => (
          <MenuItem key={berryKind.id} value={berryKind.id}>
            {berryKind.kind}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
