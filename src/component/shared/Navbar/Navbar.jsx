import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { BRAND_NAME } from "../../../configs/constants/common";
import MenuComponent from "../Menu/MenuComponent";
import { useState } from "react";
import {
  AddBusiness,
  AppRegistration,
  AssignmentInd,
  BookmarkAdded,
  Checklist,
  Diversity3,
  Inventory,
  Login,
  Logout,
  Menu,
  MenuOpen,
  QuestionAnswer,
  Search,
  Settings,
  Star,
} from "@mui/icons-material";
import { useAuth } from "contexts/AuthContext/AuthContext";
import { Avatar, Chip } from "@mui/material";
import { stringToColor } from "utils/avatarColor";
import { toast } from "react-toastify";

function CustomLink({ href, children }) {
  const location = useLocation();
  const locationSegment = location.pathname.split("/");
  const selectedLocation = href.substring(1);
  return (
    <Link
      to={href}
      className={
        selectedLocation === locationSegment[1] ? styles.navbarListActive : ""
      }
    >
      <li>{children}</li>
    </Link>
  );
}

function Navbar() {
  const navigate = useNavigate();
  const { userAuth, logout } = useAuth();
  const { data, status } = userAuth.data;
  const isHR = data.role.includes("HR") || data.role.includes("MANAGER");

  // Profile menu props and fnc
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  const handleProfileClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchor(null);
  };

  // Category menu props and fnc
  const [anchorCat, setAnchorCat] = useState(null);
  const openCat = Boolean(anchorCat);

  const handleCategoryClick = (event) => {
    setAnchorCat(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setAnchorCat(null);
  };
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbarLink}>
        <Link to="/" className={styles.navbarLogo}>
          <img
            src={require("../../../assets/images/logo.png")}
            alt="logo-img"
          />
          <span>{BRAND_NAME}</span>
        </Link>
        <ul className={styles.navbarList}>
          <CustomLink href="/jobs">Jobs Search</CustomLink>
          <CustomLink href="/experiences">Shares</CustomLink>
          <CustomLink href="/questions">Questions</CustomLink>
          <CustomLink href="/documents">Documents</CustomLink>
        </ul>
      </div>
      <div className={styles.navbarSettingContainer}>
        {status === 401 ? (
          <div className={styles.navbarAuth}>
            <p onClick={() => navigate("/authenticate/signin")}>Sign in</p>
            <span>&nbsp;</span>
            <p onClick={() => navigate("/authenticate/employer-register")}>
              Employers
            </p>
          </div>
        ) : (
          <div className={styles.navbarWelcome} onClick={handleProfileClick}>
            <Avatar
              src={data.avatar ? data.avatar : "/img.png"}
              alt={data.givenName.toUpperCase()}
              sx={{
                bgcolor: stringToColor(`${data.givenName} ${data.surname}`),
                ":hover": { cursor: "pointer" },
              }}
            />
            <p className={styles.navbarWelcome}>
              Welcome&nbsp;<span>{data.givenName}</span>
            </p>
          </div>
        )}
        <div
          className={styles.navbarCategoryMenu}
          onClick={handleCategoryClick}
        >
          {openCat ? <MenuOpen /> : <Menu />}
        </div>
      </div>

      <MenuComponent
        anchor={anchor}
        open={open}
        handleClose={handleMenuClose}
        marginTop={0}
        showArrow={false}
        menuList={[
          {
            avatar: data.avatar
              ? data.avatar
              : `${data.givenName} ${data.surname}`,
            title: (
              <div>
                <p
                  style={{ fontWeight: "bold" }}
                >{`${data.givenName} ${data.surname}`}</p>{" "}
                <Chip
                  size="small"
                  color={
                    data.status === "UNVERIFIED"
                      ? "warning"
                      : data.status === "VERIFIED"
                      ? "success"
                      : "error"
                  }
                  label={data.status}
                  sx={{ fontSize: "0.6rem", height: "1.2rem" }}
                />
                {/* <p style={{ fontSize: "10px" }}>{data.status}</p> */}
              </div>
            ),
            divider: true,
            displayOnly: true,
          },
          ...(isHR
            ? [
                {
                  icon: <Settings fontSize="small" />,
                  title: "HR Management",
                  onClick: () => navigate("/hr"),
                },
              ]
            : [
                {
                  icon: <AssignmentInd fontSize="small" />,
                  title: "Profile Setting",
                  onClick: () => navigate("/user/profile"),
                },
                {
                  icon: <Checklist fontSize="small" />,
                  title: "Applied Jobs",
                  onClick: () => navigate("/user/applied"),
                },
                {
                  icon: <Star fontSize="small" />,
                  title: "Interested Jobs",
                  onClick: () => navigate("/user/interested"),
                },
                {
                  icon: <BookmarkAdded fontSize="small" />,
                  title: "Follow Companies",
                  onClick: () => navigate("/user/follow"),
                },
              ]),
          {
            icon: <Logout fontSize="small" />,
            title: "Logout",
            textColor: "red",
            onClick: () =>
              logout(
                {
                  onSuccess: () => {
                    toast.success("Logout successfully");
                    navigate("/");
                  },
                  onError: (error) => toast.error(error?.data?.message),
                },
                false
              ),
          },
        ]}
      />

      <MenuComponent
        anchor={anchorCat}
        open={openCat}
        handleClose={handleCategoryClose}
        marginTop={0}
        showArrow={false}
        menuList={[
          ...(status === 401
            ? [
                {
                  icon: <Login fontSize="small" />,
                  title: <strong>Sign In</strong>,
                  textColor: "#eb455f",
                  onClick: () => navigate("/authenticate/signin"),
                },
                {
                  icon: <AppRegistration fontSize="small" />,
                  title: "Candidate Register",
                  textColor: "#3a78ff",
                  onClick: () => navigate("/authenticate/jobseeker-register"),
                },
                {
                  icon: <AddBusiness fontSize="small" />,
                  title: "Employee Register",
                  textColor: "#3a78ff",
                  divider: true,
                  onClick: () => navigate("/authenticate/employer-register"),
                },
              ]
            : []),
          {
            icon: <Search fontSize="small" />,
            title: "Job Search",
            onClick: () => navigate("/jobs"),
          },
          {
            icon: <Diversity3 fontSize="small" />,
            title: "Shares",
            onClick: () => navigate("/experiences"),
          },
          {
            icon: <QuestionAnswer fontSize="small" />,
            title: "Questions",
            onClick: () => navigate("/questions"),
          },
          {
            icon: <Inventory fontSize="small" />,
            title: "Document",
            onClick: () => navigate("/documents"),
          },
        ]}
      />
    </nav>
  );
}

export default Navbar;
