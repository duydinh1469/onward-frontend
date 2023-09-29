import { AccountCircle, Key } from "@mui/icons-material";
import Button from "component/shared/Button/Button";
import FormContainer from "component/shared/Form/FormContainer/FormContainer";
import FormItem from "component/shared/Form/FormItem/FormItem";
import { TextInputComponent } from "component/shared/Input";
import { useAuth } from "contexts/AuthContext/AuthContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import yup from "yup/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  emailSignIn: yup
    .string()
    .required("Email is required")
    .email("Invalid email"),
  passwordSignIn: yup.string().required("Password is required"),
});

function SignInPage() {
  const formMethods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      emailSignIn: "",
      passwordSignIn: "",
    },
  });

  const navigate = useNavigate();
  const { login, userAuth } = useAuth();
  const { status: userStatus } = userAuth.data;

  useEffect(() => {
    userStatus === 200 && navigate("/");
  }, [userStatus, navigate]);

  const handleSubmit = async (data) => {
    await login(
      { email: data.emailSignIn, password: data.passwordSignIn },
      {
        onSuccess: () => {
          toast.success("Login successfully");
          navigate("/");
        },
        onError: (error) => {
          toast.error(error?.data?.message);
        },
      }
    );
  };

  return (
    <FormContainer formMethods={formMethods} onSubmit={handleSubmit}>
      <FormItem
        name="emailSignIn"
        clearError={true}
        label="Email"
        required={true}
      >
        <TextInputComponent
          placeholder="Email"
          startAdornment={<AccountCircle />}
        />
      </FormItem>

      <FormItem
        name="passwordSignIn"
        clearError={true}
        label="Password"
        required={true}
      >
        <TextInputComponent
          placeholder="Password"
          type="password"
          startAdornment={<Key />}
          passwordSwitch={true}
        />
      </FormItem>
      <Button isSubmit={true} extraStyle={{ width: "100%", marginTop: "5px" }}>
        Sign In
      </Button>
    </FormContainer>
  );
}

export default SignInPage;
