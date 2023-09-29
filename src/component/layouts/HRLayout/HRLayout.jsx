import styles from "./styles.module.scss";
import {
  AccountCircle,
  AdminPanelSettings,
  Business,
  Logout,
  ManageAccounts,
  Menu,
  MenuOpen,
  PersonSearch,
  PostAdd,
  Star,
  Work,
} from "@mui/icons-material";
import { BRAND_NAME } from "configs/constants/common";

import { Outlet, useNavigate } from "react-router-dom";
import LeftSideBar from "component/shared/LeftSideBar/LeftSideBar";
import {
  useHrCompanyGeneralProfile,
  useHrCompanyPoints,
} from "services/apiQueries/queries/hrQueries";
import { Avatar, CircularProgress } from "@mui/material";
import Error404 from "component/shared/Error404/Error404";
import Loading from "component/shared/Loading/Loading";
import { useAuth } from "contexts/AuthContext/AuthContext";
import { useState } from "react";
import MenuComponent from "component/shared/Menu/MenuComponent";
import { toast } from "react-toastify";

function HRLayout() {
  const companyPoints = useHrCompanyPoints();
  const companyProfileQuery = useHrCompanyGeneralProfile();
  const { userAuth, logout } = useAuth();
  const hrPfp = userAuth.data;

  const navigate = useNavigate();
  // const pathname = useLocation();
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  const categories = [
    {
      path: "management",
      icon: <AdminPanelSettings />,
      label: "Management",
    },
    {
      path: "company",
      icon: <Business />,
      label: "Company",
    },
    {
      path: "post-job",
      icon: <PostAdd />,
      label: "Post a job",
    },
    {
      path: "jobs",
      icon: <Work />,
      label: "Jobs",
    },
    // {
    //   path: "candidate",
    //   icon: <PersonSearch />,
    //   label: "Candidates",
    // },
    {
      path: "setting",
      icon: <ManageAccounts />,
      label: "Account setting",
    },
  ];

  // Category menu props and fnc
  const [anchorCat, setAnchorCat] = useState(null);
  const openCat = Boolean(anchorCat);

  const handleCategoryClick = (event) => {
    setAnchorCat(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setAnchorCat(null);
  };

  const header = (
    <nav className={styles.hrNavbarContainer}>
      <div className={styles.hrNavbarLogo} onClick={() => navigate("/")}>
        <img src={require("../../../assets/images/logo.png")} alt="logo-img" />
        <span>{BRAND_NAME}</span>
      </div>
      <div className={styles.hrNavbarCategory}>
        <div
          className={styles.hrNavbarCategoryMenuBtn}
          onClick={handleCategoryClick}
        >
          {openCat ? <MenuOpen /> : <Menu />}
        </div>
        {/* <div className={styles.hrNavbarCategoryItem}>
          <Notifications />
          <p>Notification</p>
        </div> */}
        <div
          className={styles.hrNavbarCategoryItem}
          onClick={() => navigate("management")}
        >
          <Star sx={{ color: "orange" }} />
          {companyPoints.isFetching ? (
            <CircularProgress size={"1rem"} />
          ) : (
            <p>{companyPoints?.data?.points}</p>
          )}
        </div>
        <div
          className={`${styles.hrNavbarCategoryItem} ${styles.hrNavbarCategoryItemElipsisNL}`}
          onClick={() => navigate("company")}
        >
          {companyProfileQuery.isFetching ? (
            <CircularProgress size={"1rem"} />
          ) : companyProfileQuery?.data?.avatar ? (
            <Avatar
              alt="compPfpAvatar"
              src={companyProfileQuery?.data?.avatar}
            />
          ) : (
            <Business />
          )}
          <p>{companyProfileQuery?.data?.name}</p>
        </div>
        <div
          className={`${styles.hrNavbarCategoryItem} ${styles.hrNavbarCategoryItemElipsis}`}
          onClick={() => navigate("setting")}
        >
          {hrPfp?.data?.avatar ? (
            <Avatar alt="hrPfpAvatar" src={hrPfp?.data?.avatar} />
          ) : (
            <AccountCircle />
          )}
          <p>{hrPfp.data.email}</p>
        </div>
      </div>
      <MenuComponent
        anchor={anchorCat}
        open={openCat}
        handleClose={handleCategoryClose}
        marginTop={0}
        showArrow={false}
        menuList={[
          ...categories.map((category) => {
            return {
              icon: category.icon,
              title: category.label,
              onClick: () => navigate(category.path),
            };
          }),
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
    </nav>
  );

  if (companyProfileQuery.isError) return <Error404 />;

  if (companyProfileQuery.isLoading) return <Loading />;

  return (
    <div className={styles.hrLayoutContainer}>
      <div className={styles.hrLayoutSidebarContainer}>
        <LeftSideBar categories={categories} header={header} />
      </div>

      <div className={styles.hrLayoutContentContainer}>
        {header}
        <div className={styles.hrPages}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HRLayout;
