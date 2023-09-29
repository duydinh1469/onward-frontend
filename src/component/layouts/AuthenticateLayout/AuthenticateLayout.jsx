import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";
import logo from "assets/images/logo.png";
import { Card, CardContent, CardMedia } from "@mui/material";
import wallpaper from "assets/images/authenticateBackground.jpg";

function AuthenticateLayout() {
  return (
    <>
      <div className={styles.authLayoutContainer}>
        <div className={styles.authLayoutLogo}>
          <img src={logo} alt="onward-logo" />
          <p>Onward</p>
        </div>
        <Card className={styles.authLayoutPage}>
          <CardContent className={styles.authLayoutOutlet}>
            <Outlet />
          </CardContent>
        </Card>
      </div>
      <a
        href="https://www.freepik.com/free-vector/abstract-soft-blue-hand-painted-watercolor-pastel-background_29348536.htm#query=abstract-soft-blue-hand-painted-watercolor-pastel-background&position=0&from_view=search&track=sph"
        className={styles.authLayoutCopyright}
        target="_blank"
        rel="noopener noreferrer"
      >
        * Image by Creative_hat on Freepik
      </a>
    </>
  );
}

export default AuthenticateLayout;
