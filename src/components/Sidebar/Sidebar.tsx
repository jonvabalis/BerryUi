import React, { useState } from "react";
import { SIDEBAR_DATA } from "./SidebarData";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={open ? styles.sidenav : styles.sidenavClosed}>
      <button className={styles.menuBtn} onClick={toggleOpen}>
        {open ? (
          <KeyboardDoubleArrowLeftIcon />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
      </button>
      aa
      {SIDEBAR_DATA.map((item) => (
        <NavLink key={item.id} className={styles.sideitem} to={item.link}>
          {item.icon}
          <span className={open ? styles.linkText : styles.linkTextClosed}>
            {item.text}
          </span>
        </NavLink>
      ))}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Sidebar;
