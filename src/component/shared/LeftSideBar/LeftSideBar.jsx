import styles from "./styles.module.scss";
import { Close, Login, Menu, MenuOpen } from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "contexts/AuthContext/AuthContext";
import { toast } from "react-toastify";

function LeftSideBar({ categories, header, children }) {
  const [isOpen, setIsOpen] = useState(true);
  const drawerSpeed = 0.14;
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleSignOut = () => {
    logout(
      {
        onSuccess: () => {
          toast.success("Logout successfully");
          navigate("/");
        },
        onError: (error) => toast.error(error?.data?.message),
      },
      false
    );
  };

  // push to hr layout
  const location = useLocation();
  const locationArray = location.pathname.split("/");
  const catList = categories.map((item) => item.path);
  const currentSelected = locationArray?.[2]
    ? locationArray[2].trim() !== ""
      ? catList.includes(locationArray[2].trim())
        ? locationArray[2].trim()
        : null
      : "hr"
    : "hr";
  // const currentSelected =
  //   locationArray.length <= 3
  //     ? locationArray[locationArray.length - 1]
  //     : locationArray[2];
  useEffect(() => {
    currentSelected === "hr" && navigate("management");
  }, []);
  //--------------------------------------------------------

  return (
    <motion.div
      style={{
        display: "flex",
        position: "sticky",
        top: 0,
        minHeight: "100vh",
      }}
      layout
    >
      <motion.div
        className={styles.sidebarContainer}
        layout
        transition={{ duration: drawerSpeed }}
      >
        <motion.div
          layout
          transition={{ duration: drawerSpeed }}
          className={`${styles.sidebarHeader} ${styles.sidebarCategory}`}
          style={{ borderRadius: "10px" }}
          data-isopen={isOpen}
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          <motion.span layout style={{ lineHeight: 0 }}>
            {isOpen ? <MenuOpen /> : <Menu />}
          </motion.span>
          <span
            data-isopen={isOpen}
            className={`${styles.sidebarCategoryText} ${styles.sidebarHeaderText}`}
          >
            Collapse
            <Close />
          </span>
        </motion.div>

        {categories.map((item, index) => (
          <motion.div
            layout
            transition={{ duration: drawerSpeed }}
            className={`${styles.sidebarCategory} ${
              currentSelected === item.path && styles.sidebarCategorySelected
            }`}
            style={{ borderRadius: "10px" }}
            key={`${item.path} - ${index}`}
            onClick={() => navigate(item.path)}
          >
            <motion.span layout style={{ lineHeight: 0 }}>
              {item.icon}
            </motion.span>
            <span data-isopen={isOpen} className={styles.sidebarCategoryText}>
              {item.label}
            </span>
          </motion.div>
        ))}

        <motion.div
          layout
          transition={{ duration: drawerSpeed }}
          className={`${styles.sidebarCategory} ${styles.sidebarSignOut}`}
          style={{ borderRadius: "10px" }}
          onClick={handleSignOut}
        >
          <motion.span layout style={{ lineHeight: 0 }}>
            {<Login />}
          </motion.span>
          <span data-isopen={isOpen} className={styles.sidebarCategoryText}>
            Sign out
          </span>
        </motion.div>
      </motion.div>

      {/* <motion.div
        className={styles.contentContainer}
        // layout
        data-isopen={isOpen}
      >
        {header && header}
        {children}
      </motion.div> */}
    </motion.div>
  );
}

export default LeftSideBar;
