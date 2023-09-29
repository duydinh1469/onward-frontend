import styles from "./styles.module.scss";

import { useState } from "react";
import { useForm } from "react-hook-form";

import FormContainer from "component/shared/Form/FormContainer/FormContainer";
import JobDetailInputComponent from "../JobDetailInputComponent/JobDetailInputComponent";
import JobGeneralInputComponent from "../JobGeneralInputComponent/JobGeneralInputComponent";
import JobPackageInputComponent from "../JobPackageInputComponent/JobPackageInputComponent";
import Button from "component/shared/Button/Button";
import {
  Delete,
  Edit,
  RunningWithErrors,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import ActionBox from "component/shared/ActionBox/ActionBox";
import { Chip } from "@mui/material";
import { compareAsc } from "date-fns";
import { motion } from "framer-motion";
import CustomDialog from "component/shared/CustomDialog/CustomDialog";
import yup from "yup/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  jobTitle: yup.string().required("Title is required"),
  jobDescription: yup.string().required("Description is required"),
  jobBenefit: yup.string().required("Benefit is required"),
  jobRequirement: yup.string().required("Requirement is required"),
  jobType: yup
    .array()
    .of(
      yup.object({
        value: yup.number().required(),
        label: yup.string().required(),
      })
    )
    .typeError("Invalid type data")
    .min(1, "Job type is required"),
  jobHiredAmount: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .positive("Hire amount is required")
    .nonNullable("Hire amount is required"),
  jobCity: yup
    .array()
    .of(
      yup.object({
        value: yup.number().required(),
        label: yup.string().required(),
      })
    )
    .typeError("Invalid city data")
    .min(1, "City is required"),
  jobMinSalary: yup
    .number()
    .positive("Must be positive number")
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable(),
  jobMaxSalary: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .positive("Must be positive number")
    .when("jobMinSalary", ([jobMinSalary], schemaMax) => {
      return schemaMax.test({
        test: (jobMaxSalary) => {
          if (!jobMinSalary || !jobMaxSalary) return true;
          return jobMaxSalary > jobMinSalary;
        },
        message: "Must greater than Min Salary",
      });
    }),
  jobSalaryCurrency: yup.number(),
  jobPackage: yup.number(),
  jobVisible: yup.bool().nullable(),
});

function HRJobFormComponent({
  isUpdate = false,
  handleSubmit,
  handleDelete,
  handleActivate,
  pageData,
  expiredDate,
  cityArray,
  workTypeArray,
  packageArray,
  currencyArray,
}) {
  const formMethods = useForm({
    resolver: yupResolver(schema),
    defaultValues: pageData,
  });
  const [isEdit, setIsEdit] = useState(!isUpdate);
  const [isVisible, setIsVisible] = useState(pageData.jobVisible);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);

  const internalSubmit = async (data) => {
    handleSubmit(data);
    !isUpdate && formMethods.reset();
  };

  const handleVisibleSwitch = (visibility) => {
    formMethods.setValue("jobVisible", visibility);
    setIsVisible(visibility);
  };

  const internalActivate = () => {
    setOpenDialog(false);
    handleActivate({ visible: !formMethods.getValues("jobVisible") });
  };

  const resetChanges = () => {
    setIsEdit(false);
    formMethods.reset();
  };

  return (
    <>
      <FormContainer formMethods={formMethods} onSubmit={internalSubmit}>
        {isUpdate &&
          !isEdit &&
          (compareAsc(new Date(), expiredDate) >= 0 ? (
            <Chip
              label="Expired"
              color="error"
              size="small"
              sx={{
                backgroundColor: "#eb455f",
                marginBottom: "0.5em",
                opacity: isEdit ? 0.5 : 1,
              }}
              icon={<RunningWithErrors />}
              onClick={!isEdit ? () => setOpenDialog(true) : undefined}
            />
          ) : formMethods.getValues("jobVisible") ? (
            <Chip
              label="Active"
              color="info"
              size="small"
              sx={{
                backgroundColor: "rgb(58, 120, 255)",
                marginBottom: "0.5em",
                opacity: isEdit ? 0.5 : 1,
              }}
              icon={<Visibility />}
              onClick={!isEdit ? () => setOpenDialog(true) : undefined}
            />
          ) : (
            <Chip
              label="Inactive"
              color="warning"
              size="small"
              sx={{ marginBottom: "0.5em", opacity: isEdit ? 0.5 : 1 }}
              icon={<VisibilityOff />}
              onClick={!isEdit ? () => setOpenDialog(true) : undefined}
            />
          ))}

        {isUpdate && isEdit && (
          <div
            className={styles.jobFormSwitch}
            data-isvisible={isVisible}
            onClick={() => handleVisibleSwitch(!isVisible)}
          >
            <motion.div className={styles.jobFormSwitchHandle} layout>
              {isVisible ? (
                <Visibility fontSize="inherit" />
              ) : (
                <VisibilityOff fontSize="inherit" />
              )}
            </motion.div>
            {isVisible ? <p>Active</p> : <p>Inactive</p>}
          </div>
        )}

        <div className={styles.jobFormContainer}>
          <h2 className={styles.jobFormHeader}>
            {isUpdate
              ? `Update Job: ${formMethods.getValues("jobTitle")}`
              : "Create Job"}
          </h2>
          {isUpdate && !isEdit && (
            <div className={styles.jobFormAction}>
              <Button
                onClickFnc={() => setIsEdit(true)}
                extraStyle={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  marginTop: "3px",
                }}
                size={"small"}
                key={"editBtn"}
              >
                <Edit /> Edit
              </Button>
              <Button
                onClickFnc={() => setDialogDelete(true)}
                extraStyle={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  marginTop: "3px",
                }}
                size={"small"}
                type={"errorFill"}
                key={"deleteBtn"}
              >
                <Delete /> Delete
              </Button>
            </div>
          )}
        </div>

        <div className={styles.jobFormDetailContainer}>
          <JobDetailInputComponent isEdit={isEdit} />
          <div className={styles.jobFormGeneralInfoContainer}>
            <JobGeneralInputComponent
              isEdit={isEdit}
              cityArray={cityArray}
              workTypeArray={workTypeArray}
              currencyArray={currencyArray}
            />
            <JobPackageInputComponent
              expiredDate={expiredDate}
              isEdit={isEdit}
              jobPackage={packageArray}
            />
          </div>
        </div>
        {isEdit && isUpdate && (
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
                dialogMsg: "This action will save all changes for this post",
              },
            ]}
          />
        )}
      </FormContainer>

      <CustomDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        title={
          compareAsc(new Date(), expiredDate) >= 0
            ? "Start edit?"
            : "Save changes?"
        }
        message={
          compareAsc(new Date(), expiredDate) >= 0
            ? "Post is expired, please renew post"
            : `Post is currently ${
                formMethods.getValues("jobVisible") ? "Active" : "Inactive"
              }. This action will change post's status to ${
                formMethods.getValues("jobVisible") ? "Inactive" : "Active"
              }`
        }
        actionBtn={
          compareAsc(new Date(), expiredDate) >= 0
            ? [
                {
                  label: "Cancel",
                  onClick: () => setOpenDialog(false),
                  type: "text",
                },
                {
                  label: "Start edit",
                  onClick: () => {
                    formMethods.setValue("jobVisible", true);
                    setIsEdit(true);
                    setOpenDialog(false);
                  },
                  type: "extraFill",
                  size: "small",
                  isSubmit: false,
                },
              ]
            : [
                {
                  label: "Cancel",
                  onClick: () => setOpenDialog(false),
                  type: "text",
                },
                {
                  label: "Save changes",
                  onClick: internalActivate,
                  type: "extraFill",
                  size: "small",
                  isSubmit: false,
                },
              ]
        }
      />

      <CustomDialog
        open={dialogDelete}
        handleClose={() => setDialogDelete(false)}
        title={"Delete post?"}
        message={
          "This action will delete job post. Spent points will not be refunded, please proceed with caution."
        }
        actionBtn={[
          {
            label: "Cancel",
            onClick: () => setDialogDelete(false),
            type: "text",
          },
          {
            label: "Delete",
            onClick: () => {
              handleDelete();
              setDialogDelete(false);
            },
            type: "errorFill",
            size: "small",
          },
        ]}
      />
    </>
  );
}

export default HRJobFormComponent;
