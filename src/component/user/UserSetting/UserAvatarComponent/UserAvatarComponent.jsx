import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useFormContext } from "react-hook-form";
import {
  Edit,
  HighlightOff,
  Person,
  SettingsBackupRestore,
  Upload,
} from "@mui/icons-material";
import Button from "component/shared/Button/Button";
import { IconButton, Tooltip } from "@mui/material";

function UserAvatarComponent({ isEdit, setIsEdit }) {
  const [uploadAvatar, setUploadAvatar] = useState(null);
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    if (!isEdit) {
      setUploadAvatar(null);
      setValue("userAvatar", null);
    }
  }, [isEdit]);

  const onChangeAvatar = (event) => {
    if (event.target.files.length > 0) {
      setUploadAvatar(event.target.files[0]);
      setValue("userAvatar", event.target.files[0]);
    }
  };

  const resetAvatar = () => {
    setUploadAvatar(null);
    setValue("userAvatar", null);
  };

  const removeAvatar = () => {
    setValue("userAvatarLink", null);
    setValue("userAvatar", null);
    setUploadAvatar(undefined);
  };
  return (
    <div className={styles.userAvatar}>
      <div className={styles.userAvatarContainer}>
        <div className={styles.userAvatarImg}>
          {isEdit && uploadAvatar ? (
            <img alt="user avatar" src={URL.createObjectURL(uploadAvatar)} />
          ) : getValues("userAvatarLink") ? (
            <img alt="user avatar" src={getValues("userAvatarLink")} />
          ) : (
            <Person />
          )}
        </div>
        {isEdit && (
          <label className={styles.userAvatarUpload}>
            <input
              type="file"
              name="avatar"
              onChange={onChangeAvatar}
              accept="image/png, image/jpeg, image/gif"
            />
            <Upload />
            Upload avatar
          </label>
        )}
      </div>
      {isEdit && (
        <>
          <Tooltip title="Reset">
            <IconButton
              className={styles.userAvatarReset}
              onClick={resetAvatar}
            >
              <SettingsBackupRestore fontSize="inherit" />
            </IconButton>
          </Tooltip>

          <p className={styles.userAvatarRemove} onClick={removeAvatar}>
            <HighlightOff /> Delete avatar
          </p>
        </>
      )}

      {!isEdit && (
        <Button
          onClickFnc={setIsEdit}
          extraStyle={{
            display: "flex",
            alignItems: "center",
            gap: "3px",
            // marginTop: "3px",
          }}
          size={"small"}
        >
          <Edit /> Edit
        </Button>
      )}
    </div>
  );
}

export default UserAvatarComponent;
