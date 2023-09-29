import Button from "component/shared/Button/Button";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

function GetStartedComponent() {
  const navigate = useNavigate();
  return (
    <div className={styles.getStartedContainer}>
      <p className={styles.getStartedTitle}>
        Tìm kiếm những cơ hội mới và cùng nhau phát triển
      </p>
      <Button
        size="large"
        type="actionFill"
        onClickFnc={() => navigate("/jobs")}
      >
        Bắt đầu trải nghiệm ngay
      </Button>
    </div>
  );
}

export default GetStartedComponent;
