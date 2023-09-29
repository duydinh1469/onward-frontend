import { Card, CardActions, CardContent, Chip } from "@mui/material";
import styles from "./styles.module.scss";
import {
  EditCalendar,
  EditNote,
  Event,
  PersonSearch,
  RunningWithErrors,
  SupervisorAccount,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Button from "component/shared/Button/Button";

function HRJobCard({ cardInfo, handleEdit, handleCandidate }) {
  return (
    <Card variant="outlined" className={styles.hrCard}>
      <CardContent className={styles.hrCardContainer}>
        <div className={styles.hrCardGeneral}>
          <h3 className={styles.hrCardGeneralTitle}>{cardInfo.jobTitle}</h3>
          <div className={styles.hrCardGeneralDetail}>
            <div className={styles.hrCardGeneralDetailItem}>
              <p>
                <EditCalendar /> Updated at:{" "}
                <span>{cardInfo.jobUpdatedDate}</span>
              </p>
              <p>
                <Event /> Expired at: <span>{cardInfo.jobExpiredDate}</span>
              </p>
            </div>
            <p className={styles.hrCardGeneralDetailItem}>
              <SupervisorAccount /> Author:{" "}
              <span>{cardInfo.jobCreatedBy.join(", ")}</span>
            </p>
          </div>
        </div>
        <div className={styles.hrCardStatusChip}>
          <Chip
            label={
              cardInfo.jobStatus === "active"
                ? "Active"
                : cardInfo.jobStatus === "expired"
                ? "Expired"
                : "Inactive"
            }
            color={
              cardInfo.jobStatus === "active"
                ? "success"
                : cardInfo.jobStatus === "expired"
                ? "error"
                : "warning"
            }
            size="small"
            icon={
              cardInfo.jobStatus === "active" ? (
                <Visibility />
              ) : cardInfo.jobStatus === "expired" ? (
                <RunningWithErrors />
              ) : (
                <VisibilityOff />
              )
            }
            sx={{ width: "7em" }}
          />
        </div>
      </CardContent>
      <CardActions className={styles.hrCardMobileAction}>
        <Button type="actionOutline" size="small" onClickFnc={handleCandidate}>
          View Candidate
        </Button>
        <Button type="actionOutline" size="small" onClickFnc={handleEdit}>
          View Detail
        </Button>
      </CardActions>
      <div className={styles.hrCardPointerDeviceAction}>
        <p onClick={handleCandidate}>
          <PersonSearch fontSize="large" /> Candidate
        </p>
        <p onClick={handleEdit}>
          <EditNote fontSize="large" /> Detail
        </p>
      </div>
    </Card>
  );
}

export default HRJobCard;
