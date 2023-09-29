import CustomDialog from "component/shared/CustomDialog/CustomDialog";
import styles from "./styles.module.scss";
import { useApplyJobMutation } from "services/apiQueries/mutations/candidateMutation";
import { Link } from "react-router-dom";
import { fileNameExtract } from "utils/fileNameExtract";
import { useCandidateCVQuery } from "services/apiQueries/queries/candidateQueries";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function ApplyDialog({ open, setOpen, jobId, jobTitle }) {
  const queryClient = useQueryClient();
  const candidateCVQuery = useCandidateCVQuery();
  const serverFile = candidateCVQuery?.data?.cvLink
    ? fileNameExtract(candidateCVQuery.data.cvLink)
    : null;
  const applyJobMutation = useApplyJobMutation();

  const handleApply = () => {
    applyJobMutation.mutate(jobId, {
      onSuccess: () => {
        queryClient.setQueryData(["public", "jobDetail", jobId], (oldData) => {
          return { ...oldData, isApplied: true };
        });
        toast.success("Apply successfully");
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CustomDialog
      theme={"light"}
      open={open}
      handleClose={handleClose}
      title={"Apply Job"}
      actionBtn={[
        {
          label: "Cancel",
          onClick: handleClose,
          type: "errorFill",
          size: "small",
        },
        {
          label: candidateCVQuery?.data?.cvLink ? "Apply Now" : "Upload CV",
          onClick: candidateCVQuery?.data?.cvLink
            ? handleApply
            : () =>
                window.open(
                  `${window.location.origin}/user/profile`,
                  "rel=noopener noreferrer"
                ),
          size: "small",
        },
      ]}
    >
      <div className={styles.jobApplyConfirmContainer}>
        <p>
          Apply for position{" "}
          <span className={styles.jobApplyConfirmTitle}>{jobTitle}</span> ?
        </p>
        <p>Your current CV</p>

        {candidateCVQuery?.data?.cvLink ? (
          <>
            <a
              className={styles.jobApplyUserCV}
              href={candidateCVQuery.data.cvLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className={`fa-regular ${
                  serverFile.extension === "pdf"
                    ? "fa-file-pdf"
                    : serverFile.extension === "doc" ||
                      serverFile.extension === "docx"
                    ? "fa-file-word"
                    : "fa-file"
                }`}
              ></i>
              <div>
                <p className={styles.jobApplyUserCVName}>{serverFile.name}</p>
                <p
                  className={styles.jobApplyUserCVDate}
                >{`Uploaded: ${serverFile.date}`}</p>
              </div>
            </a>
            <Link
              className={styles.jobApplyConfirmChangeCV}
              to={"/user/profile"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Change CV
            </Link>
          </>
        ) : (
          <div
            className={`${styles.jobApplyUserCV} ${styles.jobApplyUserNoCV}`}
          >
            <i className="fa-regular fa-circle-xmark"></i>
            <p className={styles.jobApplyUserCVName}>No CV available</p>
          </div>
        )}
      </div>
    </CustomDialog>
  );
}

export default ApplyDialog;
