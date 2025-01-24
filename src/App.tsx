import { Box, Container } from "@mui/material";
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home.tsx";
import Statistics from "./pages/statistics.tsx";
import HistoryData from "./pages/historyData.tsx";
import User from "./pages/user.tsx";
import Settings from "./pages/settings.tsx";
import About from "./pages/about.tsx";

function App() {
  return (
    <Container
      sx={{
        bgcolor: "orange",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/historyData" element={<HistoryData />} />
          <Route path="/user" element={<User />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </Container>
  );
}

export default App;
