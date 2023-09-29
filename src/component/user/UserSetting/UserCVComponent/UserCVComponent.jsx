import { useFormContext } from "react-hook-form";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { fileNameExtract } from "utils/fileNameExtract";
import { ChangeCircle } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

function UserCVComponent({ isEdit }) {
  const { getValues, setValue } = useFormContext();
  const [uploadCV, setUploadCV] = useState(null);

  const serverFile = getValues("userCVLink")
    ? fileNameExtract(getValues("userCVLink"))
    : null;

  useEffect(() => {
    if (!isEdit) {
      setUploadCV(null);
      setValue("userCV", null);
    }
  }, [isEdit]);

  const onChangeCV = (event) => {
    if (event.target.files.length > 0) {
      const extractExtension = event.target.files[0].name.split(".");
      setUploadCV({
        file: event.target.files[0],
        name: event.target.files[0].name,
        extension: extractExtension[extractExtension.length - 1],
      });
      setValue("userCV", event.target.files[0]);
    }
  };

  const resetCV = () => {
    setUploadCV(null);
    setValue("userCV", null);
  };

  const removeCV = () => {
    setValue("userCVLink", null);
    setValue("userCV", null);
    setUploadCV(undefined);
  };

  return (
    <div style={{ marginBottom: "12px" }}>
      <p className={styles.userCVTitle}>Uploaded CV</p>
      {uploadCV || serverFile ? (
        <>
          <a
            className={styles.userCV}
            href={
              uploadCV
                ? URL.createObjectURL(uploadCV?.file)
                : getValues("userCVLink")
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {uploadCV ? (
              <i
                className={`fa-regular ${
                  uploadCV.extension === "pdf"
                    ? "fa-file-pdf"
                    : uploadCV.extension === "doc" ||
                      uploadCV.extension === "docx"
                    ? "fa-file-word"
                    : "fa-file"
                }`}
              ></i>
            ) : (
              <i
                className={`fa-regular ${
                  serverFile.extension === "pdf"
                    ? "fa-file-pdf"
                    : serverFile.extension === "doc" ||
                      serverFile.extension === "docx"
                    ? "fa-file-word"
                    : "fa-file"
                }`}
              ></i>
            )}
            <div>
              <p className={styles.userCVName}>
                {uploadCV?.name || serverFile.name}
              </p>
              <p className={styles.userCVDate}>
                {uploadCV ? "Ready" : `Uploaded: ${serverFile.date}`}
              </p>
            </div>
            {isEdit && (
              <Tooltip title="Change">
                <label
                  className={`${styles.userCVUpload} ${styles.userCVUploadIconBtn}`}
                >
                  <input
                    type="file"
                    name="cvReplace"
                    onChange={onChangeCV}
                    accept=".pdf, .doc, .docx"
                  />

                  <ChangeCircle />
                </label>
              </Tooltip>
            )}
          </a>
        </>
      ) : (
        <label
          className={`${styles.userCV} ${styles.userCVUpload}`}
          data-isedit={isEdit}
        >
          {isEdit && (
            <input
              type="file"
              name="cv"
              onChange={onChangeCV}
              accept=".pdf, .doc, .docx"
            />
          )}

          {isEdit ? (
            <>
              <i className="fa-solid fa-file-arrow-up"></i>
              <div>
                <p className={styles.userCVName}>UPLOAD FILE</p>
                <p className={styles.userCVDate}>No file available</p>
              </div>
            </>
          ) : (
            <>
              <i className="fa-solid fa-file-circle-xmark"></i>
              <div>
                <p className={styles.userCVName}>NO FILE AVAILABLE</p>
                <p className={styles.userCVDate}>No uploaded</p>
              </div>
            </>
          )}
        </label>
      )}
      {isEdit && (
        <div className={styles.userCVAction}>
          <p onClick={resetCV}>
            <i className="fa-solid fa-clock-rotate-left fa-lg"></i>
            <span>Reset</span>
          </p>
          <p onClick={removeCV}>
            <i className="fa-solid fa-trash fa-lg"></i>
            <span>Delete CV</span>
          </p>
        </div>
      )}
    </div>
  );
}
export default UserCVComponent;
