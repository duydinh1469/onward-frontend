import styles from "./styles.module.scss";
import { QuestionMark } from "@mui/icons-material";
import { Card, CardContent, CardMedia, CircularProgress } from "@mui/material";
import { useState } from "react";

function InfoCard({
  className,
  children,
  wallpaper,
  avatar,
  avatarIcon = <QuestionMark />,
  title,
  subTitle,
  type = "row",
  actions,
  useMedia = true,
  simplePfp = false,
}) {
  const [wallLoaded, setWallLoaded] = useState(false);
  return (
    <Card variant="outlined" className={`${styles.infoCard} ${className}`}>
      {!simplePfp && (
        <div className={useMedia ? styles.infoCardImgPfp : ""}>
          {/* Wallpaper */}
          {!wallLoaded && wallpaper && (
            <div className={styles.infoCardMediaBackdrop}>
              <CircularProgress color="inherit" />
            </div>
          )}
          {wallpaper && (
            <>
              <CardMedia
                component="img"
                alt="job detail"
                image={wallpaper}
                className={styles.infoCardMediaImg}
                onLoad={() => setWallLoaded(true)}
                sx={{ display: wallLoaded ? "block" : "none" }}
              />

              {/* Avatar */}
              <CardContent
                className={
                  type === "column"
                    ? `${styles.infoCardAvatarContainer} ${styles.infoCardAvatarColumn}`
                    : `${styles.infoCardAvatarContainer} ${styles.infoCardAvatarRow}`
                }
              >
                <div className={styles.infoCardAvatarBox}>
                  <div className={styles.infoCardAvatarInner}>
                    {avatar ? (
                      <img alt="card avatar" src={avatar} />
                    ) : (
                      avatarIcon
                    )}
                  </div>
                </div>
                <div
                  className={
                    type === "column"
                      ? styles.infoCardTitleColumn
                      : styles.infoCardTitleRow
                  }
                >
                  <div>
                    <h1>{title}</h1>
                    <h3>{subTitle}</h3>
                  </div>
                  <div>{actions}</div>
                </div>
              </CardContent>
            </>
          )}
        </div>
      )}

      <div
        className={styles.infoCardSimplePfp}
        data-usemedia={useMedia === true ? true : false}
        data-issimple={simplePfp === true ? true : false}
      >
        <div>
          <h1>{title}</h1>
          <h3>{subTitle}</h3>
        </div>
        <div>{actions}</div>
      </div>

      {/* Info */}
      <CardContent className={styles.infoCardTabsContainer}>
        {children}
      </CardContent>
    </Card>
  );
}

export default InfoCard;
