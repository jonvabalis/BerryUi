import { useState } from "react";
import { SIDEBAR_DATA } from "./SidebarData";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={open ? styles.sidebar : styles.sidebarClosed}>
      <button className={styles.menuBtn} onClick={toggleOpen}>
        {open ? (
          <KeyboardDoubleArrowLeftIcon />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
      </button>

      {SIDEBAR_DATA.map((item) => (
        <NavLink key={item.id} className={styles.sideitem} to={item.link}>
          {item.icon}
          <span className={open ? styles.linkText : styles.linkTextClosed}>
            {item.text}
          </span>
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;
