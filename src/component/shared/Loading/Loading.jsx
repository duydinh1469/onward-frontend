import styles from "./styles.module.scss";
import { CircularProgress } from "@mui/material";

function Loading({ className }) {
  return (
    <div className={`${styles.loadingContainer} ${className}`}>
      <CircularProgress />
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
