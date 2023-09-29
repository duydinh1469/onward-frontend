import Button from "component/shared/Button/Button";
import styles from "./styles.module.scss";
import employeeImg from "assets/images/employee.png";

function EmployeeSectionComponent() {
  return (
    <div className={styles.employeeSectionContainer}>
      <div className={styles.employeeSection}>
        <p className={styles.employeeSectionTitle}>Dành cho nhà tuyển dụng</p>
        <p className={styles.employeeSectionDescription}>
          Bạn có vị trí cần đăng tuyển ?
        </p>
        <Button
          size="large"
          type="actionOutline"
          extraStyle={{ borderColor: "white", color: "white" }}
        >
          Đăng tuyển ngay
        </Button>
      </div>
      <img
        src={employeeImg}
        alt="Employee"
        className={styles.employeeSectionImg}
      />
    </div>
  );
}

export default EmployeeSectionComponent;
