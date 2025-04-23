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
    <FormControl
      variant="outlined"
      sx={{
        mt: 1.25,
        width: { xs: "100%" },
        minWidth: { xs: "100%" },
      }}
    >
      <InputLabel id="demo-simple-select-standard-label">Kind</InputLabel>
      <Select
        sx={{
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
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value === null ? "null" : value}
        onChange={handleChange}
        label="Kind"
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
