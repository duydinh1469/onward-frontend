import FormItem from "component/shared/Form/FormItem/FormItem";
import styles from "./styles.module.scss";
import { SearchComponent } from "component/shared/Input";
import Button from "component/shared/Button/Button";

function CheckAvailableComponent({ handleNext }) {
  return (
    <div className={styles.companyCreateCheckAvail}>
      <p className={styles.companyCreateCheckAvailNotice}>
        Kiểm tra thông tin đăng ký công ty trước khi đăng ký mới. Nếu chi nhánh
        công ty đã đăng ký xin vui lòng liên hệ với quản lý của bạn để được cấp
        quyền truy cập.
      </p>
      <FormItem name="companyCheck" clearError={true}>
        <SearchComponent placeholder="Tìm kiếm công ty" options={[]} />
      </FormItem>
      <Button extraStyle={{ width: "100%" }} onClickFnc={handleNext}>
        Đăng ký mới
      </Button>
    </div>
  );
}

export default CheckAvailableComponent;
