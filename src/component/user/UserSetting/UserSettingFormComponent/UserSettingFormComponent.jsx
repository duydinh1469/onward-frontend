import FormContainer from "component/shared/Form/FormContainer/FormContainer";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { focusManager } from "@tanstack/react-query";
import ActionBox from "component/shared/ActionBox/ActionBox";
import { Card } from "@mui/material";
import UserAvatarComponent from "../UserAvatarComponent/UserAvatarComponent";
import UserInfoComponent from "../UserInfoComponent/UserInfoComponent";
import yup from "yup/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const candidateSchema = yup.object().shape({
  userGivenName: yup.string().required("Given name is required"),
  userSurname: yup.string().required("Surname is required"),
});

const hrSchema = yup.object().shape({
  userGivenName: yup.string().required("Given name is required"),
  userSurname: yup.string().required("Surname is required"),
  userPhoneNumber: yup
    .string()
    .required("Phone number is required")
    .phoneNumber("Invalid phone number"),
});

function UserSettingFormComponent({
  pageData,
  handleSubmit,
  userType,
  userEmail,
}) {
  const formMethods = useForm({
    resolver: yupResolver(userType === "hr" ? hrSchema : candidateSchema),
    defaultValues: pageData,
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    formMethods.reset(pageData);
    focusManager.isFocused() && focusManager.setFocused(undefined);
  }, [pageData]);

  const internalSubmit = async (data) => {
    handleSubmit(data, {
      onSuccess: () => {
        toast.success("Update profile successfully");
        setIsEdit(false);
        focusManager.setFocused(undefined);
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const enableEditMode = () => {
    setIsEdit(true);
    focusManager.setFocused(false);
  };

  const resetChanges = () => {
    setIsEdit(false);
    formMethods.reset();
    // focusManager.setFocused(undefined);
  };

  return (
    <>
      <Card className={styles.userSettingCard} variant="outlined">
        <h1>User Profile</h1>
        <FormContainer formMethods={formMethods} handleSubmit={internalSubmit}>
          <div className={styles.userSettingCardContainer}>
            <UserAvatarComponent isEdit={isEdit} setIsEdit={enableEditMode} />
            <UserInfoComponent
              userType={userType}
              userEmail={userEmail}
              showText={!isEdit}
            />
          </div>
        </FormContainer>
      </Card>
      {isEdit && (
        <ActionBox
          actionDesc="Careful - You are in edit mode!"
          actionBtn={[
            {
              label: "Reset",
              onClick: resetChanges,
              type: "text",
              dialogTitle: "Reset form?",
              dialogMsg: "This action will reset all recent changes",
            },
            {
              label: "Save changes",
              onClick: formMethods.handleSubmit(internalSubmit),
              type: "extraFill",
              size: "small",
              dialogTitle: "Save changes?",
              dialogMsg:
                "This action will save all changes for company profile",
            },
          ]}
        />
      )}
    </>
  );
}

export default UserSettingFormComponent;
