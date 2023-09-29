import styles from "./styles.module.scss";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "../Button/Button";

function CustomDialog({
  open,
  handleClose,
  title,
  message,
  actionBtn,
  children,
  theme = "dark",
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xl"
      PaperProps={{
        style:
          theme === "dark"
            ? {
                backgroundColor: "rgb(32, 38, 46)",
                color: "white",
              }
            : theme === "light"
            ? {
                backgroundColor: "white",
                color: "rgb(32, 38, 46)",
              }
            : undefined,
      }}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <div
          id="alert-dialog-description"
          style={{ color: theme === "dark" ? "white" : "rgb(32, 38, 46)" }}
          // sx={{ color: theme === "dark" ? "white" : "rgb(32, 38, 46)" }}
        >
          {children ? children : message}
        </div>
      </DialogContent>
      {actionBtn && (
        <DialogActions>
          {actionBtn.map((btn, index) =>
            btn.type === "text" ? (
              <p
                className={styles.dialogActionReset}
                onClick={btn?.onClick ? btn.onClick : undefined}
                key={`btnText${index}`}
              >
                {btn.label}
              </p>
            ) : (
              <Button
                onClickFnc={btn?.onClick ? btn.onClick : undefined}
                type={btn?.type}
                size={btn?.size}
                isSubmit={btn?.isSubmit ? btn.isSubmit : false}
                extraStyle={btn?.extraStyle}
                key={`btn${index}`}
              >
                {btn.label}
              </Button>
            )
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default CustomDialog;
