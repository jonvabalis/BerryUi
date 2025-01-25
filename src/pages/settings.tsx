import { Button } from "@mui/material";
import { useBerryContext } from "../components/Themes/BerryContext";
import { BERRY_TYPE } from "../components/Themes/BerryData";

export default function settings() {
  const { berryTheme, setBerryTheme } = useBerryContext();

  return (
    <div>
      <p>Current berry type: {BERRY_TYPE[berryTheme.id].type}</p>
      {BERRY_TYPE.map((berry) => (
        <Button
          key={berry.id}
          onClick={() => setBerryTheme(berry)}
          sx={{ margin: "5px", border: "1px solid black", cursor: "pointer" }}
        >
          {berry.type}
        </Button>
      ))}
    </div>
  );
}
