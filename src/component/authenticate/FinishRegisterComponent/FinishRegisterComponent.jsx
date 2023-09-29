import styles from "./styles.module.scss";

import Button from "component/shared/Button/Button";
import { useNavigate } from "react-router-dom";

function FinishRegisterComponent() {
  const navigate = useNavigate();
  return (
    <div className={styles.companyCreateFinishMsg}>
      <p>
        Chúc mừng bạn đã đăng ký tài khoản thành công. Bạn có thể tiến hành đăng
        tin sau khi được hệ thống xác thực
      </p>
      <Button onClickFnc={() => navigate("/authenticate/signin")}>
        Đăng nhập
      </Button>
    </div>
  );
}

export default FinishRegisterComponent;
