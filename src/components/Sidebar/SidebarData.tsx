import SummarizeIcon from "@mui/icons-material/Summarize";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoIcon from "@mui/icons-material/Info";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AgricultureIcon from "@mui/icons-material/Agriculture";

export interface SidebarItem {
  id: number;
  text: string;
  link: string;
  icon: JSX.Element;
}

export const UPPER_SIDEBAR_DATA: SidebarItem[] = [
  {
    id: 0,
    icon: <SummarizeIcon />,
    text: "Quick overview",
    link: "/",
  },
  {
    id: 1,
    icon: <CurrencyExchangeIcon />,
    text: "Sale",
    link: "sale",
  },
  {
    id: 2,
    icon: <AgricultureIcon />,
    text: "Collection",
    link: "collection",
  },
  {
    id: 3,
    icon: <BarChartIcon />,
    text: "Statistics",
    link: "statistics",
  },
  {
    id: 4,
    icon: <HistoryIcon />,
    text: "Historical Data",
    link: "historyData",
  },
  {
    id: 5,
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
