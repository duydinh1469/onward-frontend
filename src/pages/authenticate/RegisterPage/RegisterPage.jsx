// import styles from "./styles.module.scss";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { userRegisterService } from "services/api/registrationAPI";

import FormContainer from "component/shared/Form/FormContainer/FormContainer";
import FormItem from "component/shared/Form/FormItem/FormItem";
import { TextInputComponent } from "component/shared/Input";
import Button from "component/shared/Button/Button";
import { useForm } from "react-hook-form";
import yup from "yup/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  givenNameSignUp: yup.string().required("Given name is required"),
  surnameSignUp: yup.string().required("Surname is required"),
  emailSignUp: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  passwordSignUp: yup
    .string()
    .password("Password must have uppercase, number and special character")
    .required("Password is required"),
  confirmPasswordSignUp: yup
    .string()
    .required("Password is required")
    .when("passwordSignUp", ([passwordSignUp], schemaPassConfirm) => {
      return schemaPassConfirm.test({
        test: (confirmPassword) => {
          return confirmPassword === passwordSignUp;
        },
        message: "Confirm password is not matched",
      });
    }),
});

function RegisterPage() {
  const formMethods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      givenNameSignUp: "",
      surnameSignUp: "",
      emailSignUp: "",
      passwordSignUp: "",
      confirmPasswordSignUp: "",
    },
  });
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: userRegisterService,
    onSuccess: (data, variable, context) => {
      toast.success("Register successfully");
      navigate("/authenticate/signin");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const handleSubmit = async (data) => {
    registerMutation.mutate({
      givenName: data.givenNameSignUp,
      surname: data.surnameSignUp,
      email: data.emailSignUp,
      password: data.passwordSignUp,
    });
  };
  return (
    <FormContainer formMethods={formMethods} onSubmit={handleSubmit}>
      <FormItem
        name="givenNameSignUp"
        clearError={true}
        label="Given Name"
        required={true}
      >
        <TextInputComponent placeholder="Given Name" />
      </FormItem>

      <FormItem
        name="surnameSignUp"
        clearError={true}
        label="Surname"
        required={true}
      >
        <TextInputComponent placeholder="Surname" />
      </FormItem>

      <FormItem
        name="emailSignUp"
        clearError={true}
        label="Email"
        required={true}
      >
        <TextInputComponent placeholder="Email" />
      </FormItem>

      <FormItem
        name="passwordSignUp"
        clearError={true}
        label="Password"
        required={true}
      >
        <TextInputComponent
          placeholder="Password"
          type="password"
          passwordSwitch={true}
        />
      </FormItem>

      <FormItem
        name="confirmPasswordSignUp"
        clearError={true}
        label="Confirm Password"
        required={true}
      >
        <TextInputComponent
          placeholder="Confirm Password"
          type="password"
          passwordSwitch={true}
        />
      </FormItem>

      <Button isSubmit={true} extraStyle={{ width: "100%", marginTop: "5px" }}>
        Sign Up
      </Button>
    </FormContainer>
  );
}

export default RegisterPage;
