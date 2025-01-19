import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Explore from "./pages/explore.tsx";
import Home from "./pages/home.tsx";
import Settings from "./pages/settings.tsx";
import Statistics from "./pages/statistics.tsx";

function App() {
  return (
    <div id="main" style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
