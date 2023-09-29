import FormContainer from "component/shared/Form/FormContainer/FormContainer";
import CompanyProfileCard from "../CompanyProfileCard/CompanyProfileCard";
import CompanyDetailCard from "../CompanyDetailCard/CompanyDetailCard";
import ActionBox from "component/shared/ActionBox/ActionBox";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { focusManager } from "@tanstack/react-query";
import yup from "yup/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  companyAddress: yup.string().required("Address is required"),
  companyScale: yup
    .object({
      value: yup.string().required(),
      label: yup.string().required(),
    })
    .typeError("Invalid business scale")
    .required("Business scale is required"),
  companyWebsite: yup.string().required("Website is required"),
  companyCity: yup
    .object({
      value: yup.string().required(),
      label: yup.string().required(),
    })
    .typeError("Invalid city")
    .required("City is required"),
  companyDistrict: yup
    .object({
      value: yup.string().required(),
      label: yup.string().required(),
    })
    .typeError("Invalid district")
    .required("District is required"),
  companyDescription: yup.string().required("Description is required"),
  companyRepresenter: yup.string().required("Representer is required"),
});

function CompanyFormComponent({
  companyName,
  scaleArray,
  cityArray,
  pageData,
  handleSubmit,
}) {
  const formMethods = useForm({
    resolver: yupResolver(schema),
    defaultValues: pageData,
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    formMethods.reset(pageData);
    focusManager.isFocused() && focusManager.setFocused(undefined);
  }, [pageData]);

  const internalSubmit = (data) => {
    handleSubmit(data, {
      onSuccess: () => {
        formMethods.setValue("companyWallpaperLink", null);
        formMethods.setValue("companyAvatarLink", null);
        toast.success("Update successfully");
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
    focusManager.setFocused(undefined);
  };

  return (
    <FormContainer formMethods={formMethods} onSubmit={internalSubmit}>
      <CompanyProfileCard
        companyName={companyName}
        isEdit={isEdit}
        setIsEdit={enableEditMode}
      />

      <CompanyDetailCard
        companyScale={scaleArray}
        companyCity={cityArray}
        showText={!isEdit}
      />
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
    </FormContainer>
  );
}

export default CompanyFormComponent;
