import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import { Route, Routes } from "react-router-dom";
import QuickSummary from "./pages/quickSummary.tsx";
import Statistics from "./pages/statistics.tsx";
import HistoryData from "./pages/historyData.tsx";
import User from "./pages/user.tsx";
import Settings from "./pages/settings.tsx";
import About from "./pages/about.tsx";
import Sale from "./pages/sale.tsx";
import Collection from "./pages/collection.tsx";
import Costs from "./pages/costs.tsx";
import { useState } from "react";
import { alpha } from "@mui/material/styles";

function App() {
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => setOpen(!open);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          bgcolor: "primary.light",
          height: "100vh",
          padding: 1,
          borderRadius: 2,
          overflow: "hidden",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "stretch",
          overflowY: "scroll",
        }}
      >
        {isMobile && (
          <IconButton
            onClick={toggleSidebar}
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              zIndex: 1199,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.5),
            }}
          >
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        )}
        <Sidebar
          open={open}
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
          theme={theme}
        />

        <Routes>
          <Route path="/" element={<QuickSummary />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/costs" element={<Costs />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/historyData" element={<HistoryData />} />
          <Route path="/user" element={<User />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
