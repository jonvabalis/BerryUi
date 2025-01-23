import { Box, Typography } from "@mui/material";
import Sidebar from "./components/SidebarNew/Sidebar.tsx";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography sx={{ marginBottom: 2 }}>Jaaaa</Typography>
        <Typography sx={{ marginBottom: 2 }}>Jaaaaaa</Typography>
      </Box>
    </Box>
  );
}

export default App;
