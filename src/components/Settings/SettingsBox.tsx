import { Box, Button, Grid2, Typography } from "@mui/material";
import { BoxPaper } from "../Reusable/BoxPaper";
import { useBerryContext } from "../Themes/BerryContext";
import { BERRY_TYPE } from "../Themes/BerryData";

export default function SettingsBox() {
  const { berryTheme, setBerryTheme } = useBerryContext();

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
          <Typography>
            Current berry type: {BERRY_TYPE[berryTheme.id].type}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {BERRY_TYPE.map((berry) => (
            <Button
              key={berry.id}
              onClick={() => setBerryTheme(berry)}
              sx={{
                margin: "5px",
                border: "1px solid black",
                cursor: "pointer",
              }}
            >
              {berry.type}
            </Button>
          ))}
        </Box>
      </Grid2>
    </BoxPaper>
  );
}
