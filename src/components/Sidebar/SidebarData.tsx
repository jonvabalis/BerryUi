import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface SidebarItem {
  id: number;
  text: string;
  link: string;
  icon: JSX.Element;
}

export const SIDEBAR_DATA: SidebarItem[] = [
  {
    id: 0,
    icon: <HomeIcon />,
    text: "Home",
    link: "/",
  },
  {
    id: 1,
    icon: <BarChartIcon />,
    text: "Statistics",
    link: "statistics",
  },
  {
    id: 2,
    icon: <HistoryIcon />,
    text: "Historical Data",
    link: "historyData",
  },
  {
    id: 3,
    icon: <AccountCircleIcon />,
    text: "User",
    link: "user",
  },
  {
    id: 4,
    icon: <SettingsIcon />,
    text: "Settings",
    link: "settings",
  },
];
