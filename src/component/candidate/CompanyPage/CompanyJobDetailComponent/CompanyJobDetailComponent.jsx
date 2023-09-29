import styles from "./styles.module.scss";
import companyWallpaper from "assets/images/jobDetail.png";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Button from "component/shared/Button/Button";
import InfoCard from "component/shared/InfoCard/InfoCard";
import JobDetail from "component/shared/JobDetail/JobDetail";
import { useQueryClient } from "@tanstack/react-query";
import { IconButton, Tooltip } from "@mui/material";
import {
  BlockOutlined,
  Favorite,
  FavoriteBorder,
  FlagOutlined,
} from "@mui/icons-material";
import {
  useFavoriteJobMutation,
  useRemoveFavoriteJobMutation,
} from "services/apiQueries/mutations/candidateMutation";
import { useJobDetailQuery } from "services/apiQueries/queries/publicQueries";
import ApplyDialog from "component/candidate/Dialogs/ApplyDialog/ApplyDialog";
import ReportDialog from "component/candidate/Dialogs/ReportDialog/ReportDialog";
import Loading from "component/shared/Loading/Loading";
import NoData from "component/shared/NoData/NoData";
import { useAuth } from "contexts/AuthContext/AuthContext";

function CompanyJobDetailComponent() {
  const [openApply, setOpenApply] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const { companyId } = useParams();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const { userAuth } = useAuth();
  const roles = userAuth.data.data.role;
  const isHR = roles.includes("HR") || roles.includes("MANAGER");
  const isAnonymous = !roles || roles.includes("ANONYMOUS");

  //----------------------------------------------------------------
  const jobDetailQuery = useJobDetailQuery(searchParams.get("id"));
  const favoriteMutation = useFavoriteJobMutation(() =>
    queryClient.setQueryData(
      ["public", "jobDetail", jobDetailQuery?.data?.id],
      (oldData) => {
        return { ...oldData, isMarked: true };
      }
    )
  );
  const removeFavoriteMutation = useRemoveFavoriteJobMutation(() =>
    queryClient.setQueryData(
      ["public", "jobDetail", jobDetailQuery?.data?.id],
      (oldData) => {
        return { ...oldData, isMarked: false };
      }
    )
  );

  const companyDetail = queryClient.getQueryData([
    "public",
    "companyDetail",
    companyId,
  ]);
  //----------------------------------------------------------------
  const handleFavoriteJob = () => {
    jobDetailQuery?.data?.isMarked
      ? removeFavoriteMutation.mutate(jobDetailQuery?.data?.id)
      : favoriteMutation.mutate(jobDetailQuery?.data?.id);
  };

  const actionButton = (
    <div className={styles.companyJobDetailAction}>
      {!jobDetailQuery?.data?.isApplied ? (
        <Button onClickFnc={() => setOpenApply(true)}>Apply now</Button>
      ) : (
        <Button disabled={true} type="actionOutline">
          Applied!
        </Button>
      )}

      <Tooltip
        title={jobDetailQuery?.data?.isMarked ? "Favorited!" : "Favorite now"}
      >
        <IconButton onClick={handleFavoriteJob}>
          {jobDetailQuery?.data?.isMarked ? (
            <Favorite sx={{ color: "#FF5A5A" }} />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
      </Tooltip>

      <Tooltip
        title={jobDetailQuery?.data?.isReported ? "Reported!" : "Send Report"}
      >
        <div>
          <IconButton
            onClick={() => setOpenReport(true)}
            disabled={jobDetailQuery?.data?.isReported}
          >
            {jobDetailQuery?.data?.isReported ? (
              <BlockOutlined sx={{ color: "red" }} />
            ) : (
              <FlagOutlined />
            )}
          </IconButton>
        </div>
      </Tooltip>
    </div>
  );

  if (!searchParams.get("id")) return <NoData />;
  if (jobDetailQuery.isError) return <NoData />;
  if (jobDetailQuery.isLoading) return <Loading />;

  return (
    <>
      <InfoCard
        title={jobDetailQuery?.data?.title}
        subTitle={jobDetailQuery?.data?.company.name}
        avatar={companyDetail.avatar}
        wallpaper={companyDetail.wallpaper || companyWallpaper}
        className={styles.companyJobDetailCard}
        simplePfp={true}
        actions={isHR || isAnonymous ? <></> : actionButton}
      >
        <div
          className={styles.companyJobDetailContainer}
          data-noaction={isHR || isAnonymous ? true : false}
        >
          <JobDetail
            jobDetail={{
              location: jobDetailQuery?.data?.cities,
              updatedDate: jobDetailQuery?.data?.updateAt,
              expiredDate: jobDetailQuery?.data?.expiredAt,
              jobType: jobDetailQuery?.data?.workTypes,
              salary: {
                minSalary: jobDetailQuery?.data?.minSalary,
                maxSalary: jobDetailQuery?.data?.maxSalary,
                currency: jobDetailQuery?.data?.currency?.name,
              },
              recruitAmount: jobDetailQuery?.data?.recruitAmount,
              description: jobDetailQuery?.data?.description,
              requirement: jobDetailQuery?.data?.requirement,
              benefit: jobDetailQuery?.data?.benefit,
            }}
          />
        </div>
      </InfoCard>

      <ApplyDialog
        open={openApply}
        setOpen={setOpenApply}
        jobId={jobDetailQuery.data.id}
        jobTitle={jobDetailQuery.data.title}
      />
      <ReportDialog
        open={openReport}
        setOpen={setOpenReport}
        jobId={jobDetailQuery.data.id}
        jobTitle={jobDetailQuery.data.title}
      />
    </>
  );
}

export default CompanyJobDetailComponent;
