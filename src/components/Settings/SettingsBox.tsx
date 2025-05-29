import { Box, Button, Grid2, Typography } from "@mui/material";
import { BoxPaper } from "../Reusable/BoxPaper";
import { useBerryContext } from "../Themes/BerryContext";
import { BerryType, defaultBerryType } from "../Themes/BerryData";
import { useGetAllBerryType } from "../../api/berryTypes/useGetAllBerryType";
import { useState } from "react";

export default function SettingsBox() {
  const { setBerryTheme } = useBerryContext();
  const { data: berryTypes } = useGetAllBerryType();
  const [currentBerryTypeName, setCurrentBerryTypeName] = useState(() => {
    const savedBerryType = localStorage.getItem("berryType");
    return savedBerryType
      ? (JSON.parse(savedBerryType) as BerryType).name
      : defaultBerryType;
  });

  return (
    <BoxPaper>
      <Grid2
        container
        spacing={1}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Typography>Current berry type: {currentBerryTypeName}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {berryTypes?.map((berryType) => (
            <Button
              key={berryType.id}
              onClick={() => {
                setCurrentBerryTypeName(berryType.name);
                setBerryTheme(berryType);
              }}
              sx={{
                margin: "5px",
                border: "1px solid black",
                cursor: "pointer",
              }}
            >
              {berryType.name}
            </Button>
          ))}
        </Box>
      </Grid2>
    </BoxPaper>
  );
}
