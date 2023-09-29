import FormItem from "component/shared/Form/FormItem/FormItem";
import styles from "./styles.module.scss";
import { TextInputComponent } from "component/shared/Input";
import Button from "component/shared/Button/Button";

function HRAdminSigninComponent() {
  return (
    <>
      <div className={styles.hrName}>
        <FormItem
          name="hrGivenName"
          clearError={true}
          label="Given Name"
          key="hrGivenNameKey"
          required={true}
        >
          <TextInputComponent placeholder="Given Name" />
        </FormItem>
        <FormItem
          name="hrSurname"
          clearError={true}
          label="Surname"
          key="hrSurnameKey"
          required={true}
        >
          <TextInputComponent placeholder="Surname" />
        </FormItem>
      </div>

      <FormItem
        name="hrPhoneNumber"
        clearError={true}
        label="Phone Number"
        key="hrPhoneNumberKey"
        required={true}
      >
        <TextInputComponent placeholder="Phone Number" />
      </FormItem>
      <FormItem
        name="hrEmailSignUp"
        clearError={true}
        label="Email"
        key="hrEmailKey"
        required={true}
      >
        <TextInputComponent placeholder="Email" />
      </FormItem>
      <FormItem
        name="hrPasswordSignUp"
        clearError={true}
        label="Password"
        key="hrPassKey"
        required={true}
      >
        <TextInputComponent
          placeholder="Password"
          type="password"
          passwordSwitch={true}
        />
      </FormItem>
      <FormItem
        name="hrConfirmPasswordSignUp"
        clearError={true}
        label="Confirm Password"
        key="hrPassConfirmKey"
        required={true}
      >
        <TextInputComponent
          placeholder="Confirm Password"
          type="password"
          passwordSwitch={true}
        />
      </FormItem>
      <div className={styles.companyCreateActionContainer}>
        <Button extraStyle={{ width: "100%" }} isSubmit={true}>
          Next
        </Button>
      </div>
    </>
  );
}

export default HRAdminSigninComponent;
