import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import { useGetAllByTypeBerryKind } from "../../api/berryKinds/useGetAllByTypeBerryKind";

interface BerryKindSelectProps {
  typeId: string;
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export function BerryKindSelect({
  typeId,
  value,
  setState,
}: BerryKindSelectProps) {
  const { data, isLoading } = useGetAllByTypeBerryKind(typeId);

  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  if (isLoading) {
    return (
      <Box sx={{ color: "primary.contrastText" }}>Data is being fetched</Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ color: "primary.contrastText" }}>No data is available</Box>
    );
  }

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
        {data.map((berryKind) => (
          <MenuItem key={berryKind.id} value={berryKind.id}>
            {berryKind.kind}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
