import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoIcon from "@mui/icons-material/Info";

export interface SidebarItem {
  id: number;
  text: string;
  link: string;
  icon: JSX.Element;
}

export const UPPER_SIDEBAR_DATA: SidebarItem[] = [
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
];

export const LOWER_SIDEBAR_DATA: SidebarItem[] = [
  {
    id: 0,
    icon: <SettingsIcon />,
    text: "Settings",
    link: "settings",
  },
  {
    id: 1,
    icon: <InfoIcon />,
    text: "About",
    link: "about",
  },
];
