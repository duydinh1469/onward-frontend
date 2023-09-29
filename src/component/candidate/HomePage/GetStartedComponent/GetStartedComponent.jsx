import Button from "component/shared/Button/Button";
import styles from "./styles.module.scss";

function GetStartedComponent() {
  return (
    <div className={styles.getStartedContainer}>
      <p className={styles.getStartedTitle}>
        Tìm kiếm những cơ hội mới và cùng nhau phát triển
      </p>
      <Button size="large" type="actionFill">
        Bắt đầu trải nghiệm ngay
      </Button>
    </div>
  );
}

export default GetStartedComponent;
