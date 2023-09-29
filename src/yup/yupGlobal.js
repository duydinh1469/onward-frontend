import * as yup from "yup";

const REGEX_PASSWORD =
  /^(?!.* )(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,20}$/;
const REGEX_ONLY_NUMBER = /^\d+$/;
const REGEX_PHONE =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

yup.addMethod(yup.string, "password", function (message) {
  return this.matches(REGEX_PASSWORD, {
    message,
    excludeEmptyString: true,
  });
});

yup.addMethod(yup.string, "onlyNumber", function (message) {
  return this.matches(REGEX_ONLY_NUMBER, {
    message,
    excludeEmptyString: true,
  });
});

yup.addMethod(yup.string, "phoneNumber", function (message) {
  return this.matches(REGEX_PHONE, {
    message,
    excludeEmptyString: true,
  });
});

export default yup;
