import { Drawer, IconButton, CssBaseline, Theme } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { DrawerHeader } from "./SidebarHelpers";
import SidebarItems from "./SidebarItems";
import { LOWER_SIDEBAR_DATA, UPPER_SIDEBAR_DATA } from "./SidebarData";
import React from "react";

interface SidebarProps {
  open: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  theme: Theme;
}

export default React.memo(function Sidebar({
  open,
  isMobile,
  toggleSidebar,
  theme,
}: SidebarProps) {
  const sidebarWidth = 240;
  const closedSidebarWidth = 64;

  return (
    <>
      <CssBaseline />
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : false}
        onClose={toggleSidebar}
        anchor="left"
        ModalProps={{ keepMounted: true }}
        sx={{
          width: open ? sidebarWidth : closedSidebarWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          "& .MuiDrawer-paper": {
            width: open ? sidebarWidth : closedSidebarWidth,
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
            backgroundColor: theme.palette.secondary.light,
          },
        }}
      >
        <DrawerHeader>
          {isMobile && (
            <IconButton onClick={toggleSidebar}>
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>
          )}
          {!isMobile && (
            <IconButton onClick={toggleSidebar}>
              {open ? (
                <KeyboardDoubleArrowLeftIcon />
              ) : (
                <KeyboardDoubleArrowRightIcon />
              )}
            </IconButton>
          )}
        </DrawerHeader>

        {SidebarItems(UPPER_SIDEBAR_DATA, { marginBottom: "auto" })}
        {SidebarItems(LOWER_SIDEBAR_DATA, { marginTop: "auto" })}
      </Drawer>
    </>
  );
});
