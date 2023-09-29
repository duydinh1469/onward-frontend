import { FolderOpen } from "@mui/icons-material";
import styles from "./styles.module.scss";

function NoData({ className }) {
  return (
    <div className={`${styles.noDataContainer} ${className}`}>
      <i className="fa-regular fa-folder-open"></i>
      <p>No Data Found</p>
    </div>
  );
}

export default NoData;
