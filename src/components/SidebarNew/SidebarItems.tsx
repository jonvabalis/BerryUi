import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
  Theme,
} from "@mui/material";
import { SidebarItem } from "../Sidebar/SidebarData";

export default function SidebarItems(
  SIDEBAR_DATA: SidebarItem[],
  open: boolean,
  sx: SxProps<Theme>
) {
  return (
    <List sx={sx}>
      <Divider />
      {SIDEBAR_DATA.map((item) => (
        <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              px: 2.5,
              justifyContent: open ? "initial" : "center",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
                alignItems: "center",
                mr: open ? 3 : "auto",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
      <Divider />
    </List>
  );
}
