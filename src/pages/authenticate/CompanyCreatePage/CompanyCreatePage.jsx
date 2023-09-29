// import styles from "./styles.module.scss";

import FormContainer from "component/shared/Form/FormContainer/FormContainer";
import { useForm } from "react-hook-form";
import { useState } from "react";
import HRAdminSigninComponent from "component/authenticate/HRAdminSigninComponent/HRAdminSigninComponent";
import CompanyGeneralComponent from "component/authenticate/CompanyGeneralComponent/CompanyGeneralComponent";
import FinishRegisterComponent from "component/authenticate/FinishRegisterComponent/FinishRegisterComponent";
import { useMutation } from "@tanstack/react-query";
import { companyRegisterService } from "services/api/registrationAPI";
import {
  useCityQuery,
  useCompanyScaleQuery,
} from "services/apiQueries/queries/publicQueries";
import yup from "yup/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  hrEmailSignUp: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  hrPasswordSignUp: yup
    .string()
    .password("Password must have uppercase, number and special character")
    .required("Password is required"),
  hrConfirmPasswordSignUp: yup
    .string()
    .required("Password is required")
    .when("hrPasswordSignUp", ([hrPasswordSignUp], schemaPassConfirm) => {
      return schemaPassConfirm.test({
        test: (confirmPassword) => {
          return confirmPassword === hrPasswordSignUp;
        },
        message: "Confirm password is not matched",
      });
    }),
  hrGivenName: yup.string().required("Given name is required"),
  hrSurname: yup.string().required("Surname is required"),
  hrPhoneNumber: yup
    .string()
    .phoneNumber("Invalid phone number")
    .required("Phone number is required"),
  companyNameReg: yup.string().when("$step", ([step], schema) => {
    if (step === 1) return schema.required("Company name is required");
    return;
  }),
  companyWebsiteReg: yup.string().when("$step", ([step], schema) => {
    if (step === 1) return schema.required("Company website is required");
    return;
  }),
  companyScaleReg: yup
    .object({
      value: yup.string().required(),
      label: yup.string().required(),
    })
    .typeError("Invalid business scale")
    .when("$step", ([step], schema) => {
      if (step === 1) return schema.required("Business scale is required");
      return schema.nullable().notRequired();
    }),
  companyAddressReg: yup.string().when("$step", ([step], schema) => {
    if (step === 1) return schema.required("Company address is required");
    return;
  }),
  companyCity: yup
    .object({
      value: yup.number().required(),
      label: yup.string().required(),
    })
    .typeError("Invalid city")
    .when("$step", ([step], schema) => {
      if (step === 1) return schema.required("City is required");
      return schema.nullable().notRequired();
    }),
  companyDistrict: yup
    .object({
      value: yup.number().required(),
      label: yup.string().required(),
    })
    .typeError("Invalid district")
    .when("$step", ([step], schema) => {
      if (step === 1) return schema.required("District is required");
      return schema.nullable().notRequired();
    }),
});

function CompanyCreatePage() {
  const [activeStep, setActiveStep] = useState(0);
  const formMethods = useForm({
    resolver: yupResolver(schema),
    context: { step: activeStep },
    defaultValues: {
      hrEmailSignUp: "",
      hrPasswordSignUp: "",
      hrConfirmPasswordSignUp: "",
      hrGivenName: "",
      hrSurname: "",
      hrPhoneNumber: "",
      companyNameReg: "",
      companyWebsiteReg: "",
      companyScaleReg: null,
      companyAddressReg: "",
      companyCity: null,
      companyDistrict: null,
    },
  });

  const scaleQuery = useCompanyScaleQuery();
  const cityQuery = useCityQuery();

  const registerMutation = useMutation({
    mutationFn: companyRegisterService,
    onSuccess: () => setActiveStep((prevActiveStep) => prevActiveStep + 1),
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (data) => {
    if (activeStep === 1) {
      registerMutation.mutate({
        email: data.hrEmailSignUp,
        password: data.hrPasswordSignUp,
        givenName: data.hrGivenName,
        surname: data.hrSurname,
        phoneNumber: data.hrPhoneNumber,
        name: data.companyNameReg,
        scale: data.companyScaleReg.value,
        website: data.companyWebsiteReg,
        address: data.companyAddressReg,
        districtId: data.companyDistrict.value,
      });
    } else {
      handleNext();
    }
  };
  return (
    <>
      {cityQuery.isSuccess && scaleQuery.isSuccess ? (
        <FormContainer formMethods={formMethods} onSubmit={handleSubmit}>
          {activeStep === 0 ? (
            <HRAdminSigninComponent />
          ) : activeStep === 1 ? (
            <CompanyGeneralComponent
              handleBack={handleBack}
              cityArray={cityQuery.data}
              scaleArray={scaleQuery.data}
            />
          ) : (
            <FinishRegisterComponent />
          )}
        </FormContainer>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default CompanyCreatePage;
