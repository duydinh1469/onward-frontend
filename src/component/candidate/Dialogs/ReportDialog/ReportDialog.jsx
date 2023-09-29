import { useQueryClient } from "@tanstack/react-query";
import styles from "./styles.module.scss";
import CustomDialog from "component/shared/CustomDialog/CustomDialog";
import FormContainer from "component/shared/Form/FormContainer/FormContainer";
import { useForm } from "react-hook-form";
import FormItem from "component/shared/Form/FormItem/FormItem";
import { TextInputComponent } from "component/shared/Input";
import PictureCard from "component/shared/PictureCard/PictureCard";
import Carousel from "component/shared/Carousel/Carousel";
import { useRef, useState } from "react";
import { useReportJobMutation } from "services/apiQueries/mutations/candidateMutation";
import { toast } from "react-toastify";

function ReportDialog({ open, setOpen, jobId, jobTitle }) {
  const [reportImages, setReportImages] = useState([]);
  const formMethods = useForm({
    defaultValues: {
      reportDetail: "",
      reportImages: [],
    },
  });
  const submitBtnRef = useRef(null);

  const queryClient = useQueryClient();
  const reportJobMutation = useReportJobMutation();

  const handleReportImages = (imgList) => {
    formMethods.setValue("reportImages", [...imgList, ...reportImages]);
    setReportImages([...imgList, ...reportImages]);
  };

  const handleDeleteImage = (imgId) => {
    formMethods.setValue(
      "reportImages",
      reportImages.filter((img, index) => {
        return index !== imgId;
      })
    );
    setReportImages(reportImages.filter((img, index) => index !== imgId));
  };

  const handleSubmitReport = (data) => {
    const form = new FormData();
    form.append("jobId", jobId);
    form.append("detail", data.reportDetail);
    data.reportImages.forEach((img) => form.append("reportImages", img));
    reportJobMutation.mutate(form, {
      onSuccess: () => {
        queryClient.setQueryData(["public", "jobDetail", jobId], (oldData) => {
          return { ...oldData, isReported: true };
        });
        toast.success("Report successully");
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
    handleClose();
  };

  const handleClose = () => {
    setReportImages([]);
    setOpen(false);
    formMethods.reset();
  };

  return (
    <CustomDialog
      theme={"light"}
      open={open}
      handleClose={handleClose}
      title={"Report Job"}
      actionBtn={[
        {
          label: "Cancel",
          onClick: handleClose,
          type: "errorFill",
          size: "small",
        },
        {
          label: "Report",
          onClick: () => submitBtnRef?.current?.click(),
          size: "small",
        },
      ]}
    >
      <div className={styles.jobReportContainer}>
        <p className={styles.jobReportTitle}>
          Report job <span>{jobTitle}</span> ?
        </p>
        <p className={styles.jobReportCaution}>
          (*Caution: You can not undo report)
        </p>
        <FormContainer formMethods={formMethods} onSubmit={handleSubmitReport}>
          <FormItem name={"reportDetail"} clearError={true}>
            <TextInputComponent placeholder="Report Detail" rows={7} />
          </FormItem>
          <p className={styles.jobReportLabel}>Upload images</p>
          <div className={styles.jobReportImgUploadCard}>
            <PictureCard useAdd={true} handleAdd={handleReportImages} />
          </div>
          <Carousel
            imageArray={reportImages.map((image, index) => (
              <PictureCard
                imageSrc={URL.createObjectURL(image)}
                imageAlt={`compIntroImg - ${index}`}
                key={`compIntroImg - ${index}`}
                useDelete={true}
                handleDelete={handleDeleteImage}
                imageId={index}
              />
            ))}
            size={3}
          />
          <button hidden={true} ref={submitBtnRef} type={"submit"} />
        </FormContainer>
      </div>
    </CustomDialog>
  );
}

export default ReportDialog;
