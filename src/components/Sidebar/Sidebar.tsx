import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useState } from "react";
import { Drawer, DrawerHeader } from "./SidebarHelpers";
import SidebarItems from "./SidebarItems";
import { LOWER_SIDEBAR_DATA, UPPER_SIDEBAR_DATA } from "./SidebarData";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ backgroundColor: "secondary.light" }}>
          <IconButton
            onClick={handleDrawer}
            sx={{
              minWidth: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {open ? (
              <KeyboardDoubleArrowLeftIcon />
            ) : (
              <KeyboardDoubleArrowRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        {SidebarItems(UPPER_SIDEBAR_DATA, open, {
          marginBottom: "auto",
        })}
        {SidebarItems(LOWER_SIDEBAR_DATA, open, {
          marginTop: "auto",
        })}
      </Drawer>
    </>
  );
}
