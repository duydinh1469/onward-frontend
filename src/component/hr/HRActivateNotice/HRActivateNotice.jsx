import Button from "component/shared/Button/Button";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

function HRActivateNotice() {
  const navigate = useNavigate();
  return (
    <div className={styles.activeNoticeContainer}>
      <h2 className={styles.activeNoticeTitle}>Company Profile Unfinished</h2>
      <p className={styles.activeNoticeDesc}>
        Update your company profile before you start to create posts.
      </p>
      <Button onClickFnc={() => navigate("/hr/company")}>
        Update Company Profile
      </Button>
    </div>
  );
}

export default HRActivateNotice;
