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
import Login from "./pages/login.tsx";
import Register from "./pages/register.tsx";
import ProtectedRoute from "./components/Reusable/ProtectedRoute.tsx";
import { useAuth } from "./providers/AuthProvider.tsx";
import Logout from "./pages/logout.tsx";
import AuthRoute from "./components/Reusable/AuthRoute.tsx";

function App() {
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => setOpen(!open);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isAuthenticated } = useAuth();

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
          isProtected={isAuthenticated}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <QuickSummary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sale"
            element={
              <ProtectedRoute>
                <Sale />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collection"
            element={
              <ProtectedRoute>
                <Collection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/costs"
            element={
              <ProtectedRoute>
                <Costs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/statistics"
            element={
              <ProtectedRoute>
                <Statistics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/historyData"
            element={
              <ProtectedRoute>
                <HistoryData />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/register"
            element={
              <AuthRoute>
                <Register />
              </AuthRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </>
  );
}

export default App;
