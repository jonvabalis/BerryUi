import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Explore from "./pages/explore.tsx";
import Home from "./pages/home.tsx";
import Settings from "./pages/settings.tsx";
import Statistics from "./pages/statistics.tsx";

function App() {
  return (
    <div id="main">
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Sidebar>
    </div>
  );
}

export default App;
