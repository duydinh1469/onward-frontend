import { useState } from "react";
import Button from "../Button/Button";
import CustomDialog from "../CustomDialog/CustomDialog";
import styles from "./styles.module.scss";
function ActionBox({ actionDesc, actionBtn }) {
  const [openDialog, setOpenDialog] = useState(-1);
  const handleCloseDialog = () => setOpenDialog(-1);
  return (
    <>
      <div className={styles.actionBoxContainer}>
        <div className={styles.actionBoxAction}>
          <p className={styles.actionBoxActionText}>{actionDesc}</p>
          <div className={styles.actionBoxActionButtonGroup}>
            {actionBtn.map((btn, index) =>
              btn.type === "text" ? (
                <p
                  className={styles.actionBoxActionReset}
                  onClick={
                    btn?.onClick ? () => setOpenDialog(index) : undefined
                  }
                  key={`actionBtnText${index}`}
                >
                  {btn.label}
                </p>
              ) : (
                <Button
                  onClickFnc={
                    btn?.onClick || btn?.isSubmit
                      ? () => setOpenDialog(index)
                      : undefined
                  }
                  type={btn?.type}
                  size={btn?.size}
                  extraStyle={{ ...btn?.extraStyle }}
                  key={`actionBtn${index}`}
                >
                  {btn.label}
                </Button>
              )
            )}
          </div>
        </div>
      </div>
      {openDialog !== -1 && (
        <CustomDialog
          open={openDialog !== -1}
          handleClose={handleCloseDialog}
          title={actionBtn[openDialog].dialogTitle}
          message={actionBtn[openDialog].dialogMsg}
          actionBtn={[
            {
              label: "Cancel",
              onClick: handleCloseDialog,
              type: "text",
            },
            {
              label: actionBtn[openDialog].label,
              onClick: () => {
                actionBtn[openDialog].onClick();
                handleCloseDialog();
              },
              type: "extraFill",
              size: "small",
            },
          ]}
        />
      )}
    </>
  );
}

export default ActionBox;
