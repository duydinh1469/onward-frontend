import FormItem from "component/shared/Form/FormItem/FormItem";
import styles from "./styles.module.scss";
import { TextInputComponent } from "component/shared/Input";
import UserCVComponent from "../UserCVComponent/UserCVComponent";

function UserInfoComponent({ userEmail, showText, userType }) {
  return (
    <div>
      <div>
        <p className={styles.userInfoCustomTitle}>Email</p>
        <p className={styles.userInfoCustomValue}>{userEmail}</p>
      </div>

      <FormItem
        name={"userGivenName"}
        clearError={true}
        label="Given Name"
        required={!showText}
      >
        <TextInputComponent
          placeholder="Given Name"
          showText={showText}
          disabled={showText}
        />
      </FormItem>

      <FormItem
        name={"userSurname"}
        clearError={true}
        label="Surname"
        required={!showText}
      >
        <TextInputComponent
          placeholder="Surname"
          showText={showText}
          disabled={showText}
        />
      </FormItem>

      {userType === "hr" && (
        <FormItem
          name={"userPhoneNumber"}
          clearError={true}
          label="Phone Number"
          required={!showText}
        >
          <TextInputComponent
            placeholder="Phone Number"
            showText={showText}
            disabled={showText}
          />
        </FormItem>
      )}

      {userType === "candidate" && <UserCVComponent isEdit={!showText} />}
    </div>
  );
}

export default UserInfoComponent;
