import styles from "./styles.module.scss";
import introImg from "../../../../assets/images/introduction.png";
import Button from "../../../shared/Button/Button";

function IntroductionComponent() {
  return (
    <div className={styles.introContainer}>
      <div className={styles.introInfo}>
        <h2 className={styles.introInfoTitle}>
          Thông tin việc làm và nhiều hơn nữa...
        </h2>
        <p className={styles.introInfoDescription}>
          Kênh thông tin việc làm và trao đổi kiến thức dành cho sinh viên
        </p>
        <Button size="large" type="actionFill">
          Tìm việc ngay
        </Button>
      </div>
      <img className={styles.introImg} src={introImg} alt="introImg" />
    </div>
  );
}

export default IntroductionComponent;
