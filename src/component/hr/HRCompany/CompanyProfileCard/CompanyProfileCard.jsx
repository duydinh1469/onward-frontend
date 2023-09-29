import { Card, CardContent, CardMedia, CircularProgress } from "@mui/material";
import styles from "./styles.module.scss";
import { BusinessOutlined, Edit, Upload } from "@mui/icons-material";
import Button from "component/shared/Button/Button";
import defaultWallpaper from "assets/images/company_profile.jpg";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

function CompanyProfileCard({ type = "row", companyName, isEdit, setIsEdit }) {
  const [uploadWall, setUploadWall] = useState(null);
  const [uploadAvatar, setUploadAvatar] = useState(null);
  const [wallLoaded, setWallLoaded] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    if (!isEdit) {
      setUploadWall(null);
      setUploadAvatar(null);
      setValue("companyWallpaper", null);
      setValue("companyAvatar", null);
    }
  }, [isEdit]);

  useEffect(() => {
    !getValues("companyAvatarLink") && !avatarLoaded && setAvatarLoaded(true);
  }, []);

  const onChangeWall = (event) => {
    if (event.target.files.length > 0) {
      setUploadWall(event.target.files[0]);
      setValue("companyWallpaper", event.target.files[0]);
    }
  };
  const onChangeAvatar = (event) => {
    if (event.target.files.length > 0) {
      setUploadAvatar(event.target.files[0]);
      setValue("companyAvatar", event.target.files[0]);
    }
  };

  return (
    <Card variant="outlined" className={styles.compProfileCard}>
      {/* Wallpaper */}
      {!wallLoaded && !isEdit && (
        <div className={styles.compProfileCardMediaBackdrop}>
          <CircularProgress color="inherit" />
        </div>
      )}
      <div
        style={{
          position: "relative",
          display: wallLoaded || isEdit ? "block" : "none",
        }}
      >
        {isEdit && (
          <label className={styles.compWallpaperUpload}>
            <input
              type="file"
              name="wallpaper"
              onChange={onChangeWall}
              accept="image/png, image/jpeg"
            />
            <Upload />
            Upload wallpaper
          </label>
        )}

        <CardMedia
          component="img"
          alt="comp wallpaper"
          image={
            isEdit && uploadWall
              ? URL.createObjectURL(uploadWall)
              : getValues("companyWallpaperLink") || defaultWallpaper
          }
          className={styles.compProfileCardMediaImg}
          onLoad={() => setWallLoaded(true)}
        />
      </div>

      {/* Avatar */}
      <CardContent
        className={
          type === "column"
            ? `${styles.compProfileCardAvatarContainer} ${styles.compProfileCardAvatarColumn}`
            : `${styles.compProfileCardAvatarContainer} ${styles.compProfileCardAvatarRow}`
        }
      >
        <div className={styles.compProfileCardAvatarBox}>
          <div className={styles.compProfileCardAvatarInner}>
            {!avatarLoaded && !isEdit && (
              <div className={styles.compProfileCardAvatarBackdrop}>
                <CircularProgress color="inherit" />
              </div>
            )}
            {isEdit && uploadAvatar ? (
              <img
                alt="card avatar"
                src={URL.createObjectURL(uploadAvatar)}
                onLoad={() => setAvatarLoaded(true)}
                style={{
                  display: avatarLoaded || isEdit ? "block" : "none",
                }}
              />
            ) : getValues("companyAvatarLink") ? (
              <img
                alt="card avatar"
                src={getValues("companyAvatarLink")}
                onLoad={() => setAvatarLoaded(true)}
                style={{
                  display: avatarLoaded || isEdit ? "block" : "none",
                }}
              />
            ) : (
              <BusinessOutlined />
            )}
          </div>

          {isEdit && (
            <label className={styles.compAvatarUpload}>
              <input
                type="file"
                name="avatar"
                onChange={onChangeAvatar}
                accept="image/png, image/jpeg"
              />
              <Upload />
              Upload avatar
            </label>
          )}
        </div>
        <div
          className={
            type === "column"
              ? styles.compProfileCardTitleColumn
              : styles.compProfileCardTitleRow
          }
          data-isedit={isEdit}
        >
          <h1>{companyName}</h1>
          {!isEdit && (
            <Button
              onClickFnc={setIsEdit}
              extraStyle={{
                display: "flex",
                alignItems: "center",
                gap: "3px",
                marginTop: "3px",
              }}
              size={"small"}
            >
              <Edit /> Edit
            </Button>
          )}
        </div>
      </CardContent>
      <p>&nbsp;</p>
    </Card>
  );
}

export default CompanyProfileCard;
