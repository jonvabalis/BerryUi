import { Box } from "@mui/material";
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

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "primary.light",
        height: "100vh",
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "stretch",
      }}
    >
      <Sidebar />
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
  );
}

export default App;
