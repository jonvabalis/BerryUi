import { Divider, List, SxProps, Theme } from "@mui/material";
import { SidebarItem } from "./SidebarData";
import { NavLink } from "react-router-dom";
import SidebarItemEntry from "./SidebarItemEntry";

export default function SidebarItems(
  isProtected: boolean,
  SIDEBAR_DATA: SidebarItem[],
  sx: SxProps<Theme>
) {
  return (
    <List
      sx={{
        ...sx,
        backgroundColor: "secondary.light",
      }}
    >
      <Divider />
      {SIDEBAR_DATA.filter((item) => item.isProtected === isProtected).map(
        (item) => (
          <NavLink key={item.id} to={item.link}>
            <SidebarItemEntry item={item} />
          </NavLink>
        )
      )}
      <Divider />
    </List>
  );
}
