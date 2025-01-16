import HomeIcon from "@mui/icons-material/Home";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

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
    icon: <TravelExploreIcon />,
    text: "Explore",
    link: "explore",
  },
  {
    id: 2,
    icon: <BarChartIcon />,
    text: "Statistics",
    link: "statistics",
  },
  {
    id: 3,
    icon: <SettingsIcon />,
    text: "Settings",
    link: "settings",
  },
];
