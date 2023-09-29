import Button from "component/shared/Button/Button";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

function ComingSoon() {
  const navigate = useNavigate();
  return (
    <div className={styles.csContainer}>
      <p className={styles.csTitle}>Coming soon !</p>
      <Button onClickFnc={() => navigate("/")}>Return to Home Page</Button>
    </div>
  );
}

export default ComingSoon;
