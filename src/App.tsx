import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Sidebar from "./components/Sidebar/Sidebar";
import User from "./pages/user.tsx";
import Home from "./pages/home.tsx";
import Settings from "./pages/settings.tsx";
import Statistics from "./pages/statistics.tsx";
import HistoryData from "./pages/historyData.tsx";

function App() {
  return (
    <div className={styles.main}>
      <Sidebar />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/historyData" element={<HistoryData />} />
          <Route path="/user" element={<User />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
