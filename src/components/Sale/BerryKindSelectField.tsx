import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { BerryKind } from "../../api/berryKinds/useGetAllByTypeBerryKind";

interface BerryKindSelectFieldProps {
  berryKindsData: BerryKind[] | undefined;
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export function BerryKindSelect({
  berryKindsData,
  value,
  setState,
}: BerryKindSelectFieldProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">Kind</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        onChange={handleChange}
        label="BerryKind"
      >
        <MenuItem key={0} value={"Mixed"}>
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
