import SummarizeIcon from "@mui/icons-material/Summarize";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoIcon from "@mui/icons-material/Info";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";

export interface SidebarItem {
  id: number;
  text: string;
  link: string;
  icon: JSX.Element;
  isProtected: boolean;
}

//TODO: refactor is protected to use roles from jwt instead. showOnlyForTheseRoles: ["Role1", "..."]
export const UPPER_SIDEBAR_DATA: SidebarItem[] = [
  {
    id: 0,
    icon: <SummarizeIcon />,
    text: "Quick overview",
    link: "/",
    isProtected: true,
  },
  {
    id: 1,
    icon: <CurrencyExchangeIcon />,
    text: "Sale",
    link: "sale",
    isProtected: true,
  },
  {
    id: 2,
    icon: <AgricultureIcon />,
    text: "Collection",
    link: "collection",
    isProtected: true,
  },
  {
    id: 3,
    icon: <BusinessCenterIcon />,
    text: "Costs",
    link: "costs",
    isProtected: true,
  },
  {
    id: 4,
    icon: <BarChartIcon />,
    text: "Statistics",
    link: "statistics",
    isProtected: true,
  },
  {
    id: 5,
    icon: <HistoryIcon />,
    text: "Historical Data",
    link: "historyData",
    isProtected: true,
  },
  {
    id: 6,
    icon: <AccountCircleIcon />,
    text: "User",
    link: "user",
    isProtected: true,
  },
];

export const LOWER_SIDEBAR_DATA: SidebarItem[] = [
  {
    id: 0,
    icon: <SettingsIcon />,
    text: "Settings",
    link: "settings",
    isProtected: true,
  },
  {
    id: 1,
    icon: <InfoIcon />,
    text: "About",
    link: "about",
    isProtected: true,
  },
  {
    id: 2,
    icon: <LoginIcon />,
    text: "Login",
    link: "login",
    isProtected: false,
  },
  {
    id: 3,
    icon: <AppRegistrationIcon />,
    text: "Register",
    link: "register",
    isProtected: true,
  },
  {
    id: 4,
    icon: <LogoutIcon />,
    text: "Logout",
    link: "logout",
    isProtected: true,
  },
];
