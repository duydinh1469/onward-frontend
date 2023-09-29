import { Star } from "@mui/icons-material";
import styles from "./styles.module.scss";
import Button from "component/shared/Button/Button";
import { useCompanyAttendanceMutation } from "services/apiQueries/mutations/managerMutations";
import { isToday } from "date-fns";
import {
  useHrCompanyGeneralProfile,
  useHrCompanyPoints,
} from "services/apiQueries/queries/hrQueries";
import Loading from "component/shared/Loading/Loading";
import { toast } from "react-toastify";

function HRManagementPage() {
  const companyPoints = useHrCompanyPoints();
  const companyProfileQuery = useHrCompanyGeneralProfile();

  const attendance = useCompanyAttendanceMutation();
  if (companyProfileQuery.isFetching || companyPoints.isFetching)
    return <Loading />;
  return (
    <>
      <h2 className={styles.managementHeader}>My Points</h2>
      <div className={styles.managementPoints}>
        <div className={styles.managementPointsContainer}>
          <h3>Point Balance</h3>
          <div className={styles.managementPointsBalance}>
            <Star />
            <p>{companyPoints?.data?.points}</p>
          </div>
        </div>

        <div className={styles.managementPointsClaim}>
          <h3>Claim daily points</h3>
          {isToday(new Date(companyProfileQuery?.data?.loginDate)) ? (
            <Button type={"actionOutline"} size="small" disabled={true}>
              Claimed!
            </Button>
          ) : (
            <Button
              type={"actionFill"}
              size="small"
              onClickFnc={() =>
                attendance.mutate(undefined, {
                  onSuccess: () => toast.success("Attend successfully"),
                  onError: (error) => toast.error(error?.message),
                })
              }
            >
              Get 100 points!
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default HRManagementPage;
