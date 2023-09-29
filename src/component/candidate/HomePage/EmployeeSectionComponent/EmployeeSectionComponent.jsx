import Button from "component/shared/Button/Button";
import styles from "./styles.module.scss";
import employeeImg from "assets/images/employee.png";
import { useAuth } from "contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

function EmployeeSectionComponent() {
  const navigate = useNavigate();
  const { userAuth } = useAuth();
  const { data } = userAuth.data;

  if (!data?.role?.includes("ANONYMOUS")) return <></>;

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
          onClickFnc={() => navigate("/authenticate/employer-register")}
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
