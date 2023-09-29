import styles from "./styles.module.scss";
import companyWallpaper from "assets/images/jobDetail.png";

import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { IconButton, Tab, Tabs, Tooltip } from "@mui/material";

import Button from "component/shared/Button/Button";
import InfoCard from "component/shared/InfoCard/InfoCard";
import JobDetail from "component/shared/JobDetail/JobDetail";
import CompanyDetail from "component/shared/CompanyDetail/CompanyDetail";

import { useParams, useSearchParams } from "react-router-dom";
import {
  useCompanyDetailQuery,
  useJobDetailQuery,
} from "services/apiQueries/queries/publicQueries";
import {
  BlockOutlined,
  Favorite,
  FavoriteBorder,
  FlagOutlined,
} from "@mui/icons-material";
import ApplyDialog from "component/candidate/Dialogs/ApplyDialog/ApplyDialog";
import {
  useFavoriteJobMutation,
  useFollowCompanyMutation,
  useRemoveFavoriteJobMutation,
  useUnFollowCompanyMutation,
} from "services/apiQueries/mutations/candidateMutation";
import { useQueryClient } from "@tanstack/react-query";
import ReportDialog from "component/candidate/Dialogs/ReportDialog/ReportDialog";
import Loading from "component/shared/Loading/Loading";
import NoData from "component/shared/NoData/NoData";
import { useAuth } from "contexts/AuthContext/AuthContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function JobDetailComponent({ asPage }) {
  const [tabValue, setTabValue] = useState(0);
  const [openApply, setOpenApply] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { userAuth } = useAuth();
  const roles = userAuth.data.data.role;
  const isHR = roles.includes("HR") || roles.includes("MANAGER");
  const isAnonymous = !roles || roles.includes("ANONYMOUS");

  //----------------------------------------------------------------
  const { jobId } = useParams();
  const jobDetailQuery = useJobDetailQuery(
    asPage && jobId ? jobId : searchParams.get("id")
  );
  const companyDetailQuery = useCompanyDetailQuery(
    jobDetailQuery?.data?.companyId
  );
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

  const followCompanyMutation = useFollowCompanyMutation(() => {
    queryClient.setQueryData(
      ["public", "companyDetail", jobDetailQuery?.data?.companyId],
      (oldData) => {
        return {
          ...oldData,
          isFollowed: true,
          followNumber: oldData.followNumber + 1,
        };
      }
    );
    queryClient.invalidateQueries(
      ["public", "companyDetail", jobDetailQuery?.data?.companyId],
      { exact: true }
    );
  });
  const unFollowCompanyMutation = useUnFollowCompanyMutation(() => {
    queryClient.setQueryData(
      ["public", "companyDetail", jobDetailQuery?.data?.companyId],
      (oldData) => {
        return {
          ...oldData,
          isFollowed: false,
          followNumber: oldData.followNumber - 1,
        };
      }
    );
    queryClient.invalidateQueries(
      ["public", "companyDetail", jobDetailQuery?.data?.companyId],
      { exact: true }
    );
  });
  //----------------------------------------------------------------
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleFavoriteJob = () => {
    jobDetailQuery?.data?.isMarked
      ? removeFavoriteMutation.mutate(jobDetailQuery?.data?.id)
      : favoriteMutation.mutate(jobDetailQuery?.data?.id);
  };
  const handleFollowCompany = () => {
    companyDetailQuery?.data?.isFollowed
      ? unFollowCompanyMutation.mutate(jobDetailQuery?.data?.companyId)
      : followCompanyMutation.mutate(jobDetailQuery?.data?.companyId);
  };

  const actionButton = (
    <div className={styles.jobDetailAction}>
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

  useEffect(() => {
    setTabValue(0);
  }, [searchParams]);

  if (!asPage && !searchParams.get("id")) return <NoData />;
  if (jobDetailQuery.isError || companyDetailQuery.isError) return <NoData />;
  if (jobDetailQuery.isLoading || companyDetailQuery.isLoading)
    return <Loading />;

  return (
    <>
      <InfoCard
        title={jobDetailQuery?.data?.title}
        subTitle={
          <a href={`/company/${companyDetailQuery?.data?.id}`}>
            {jobDetailQuery?.data?.company.name}
          </a>
        }
        avatar={companyDetailQuery?.data?.avatar}
        wallpaper={companyDetailQuery?.data?.wallpaper || companyWallpaper}
        className={!asPage ? styles.jobDetailCardAsPage : ""}
        actions={isHR || isAnonymous ? <></> : actionButton}
        simplePfp={asPage ? false : true}
        useMedia={asPage ? false : true}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          className={styles.jobDetailTabs}
        >
          <Tab label={"Chi tiết"} className={styles.jobDetailTab} />
          <Tab label={"Thông tin công ty"} className={styles.jobDetailTab} />
        </Tabs>

        <div
          className={styles.jobDetailContainer}
          data-aspage={asPage ? asPage : false}
          data-noaction={isHR || isAnonymous ? true : false}
        >
          <TabPanel value={tabValue} index={0}>
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
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <CompanyDetail
              companyId={jobDetailQuery?.data?.companyId}
              companyDetail={{
                address: companyDetailQuery?.data?.address,
                represent: companyDetailQuery?.data?.representer,
                scale: companyDetailQuery?.data?.scale,
                website: companyDetailQuery?.data?.website,
                follower: companyDetailQuery?.data?.followNumber,
                about: companyDetailQuery?.data?.description,
                companyImages: companyDetailQuery?.data?.companyImages?.map(
                  (img) => img.imageLink
                ),
                isFollowed: companyDetailQuery?.data?.isFollowed,
              }}
              handleFollow={handleFollowCompany}
              hasFollowBtn={!isHR}
            />
          </TabPanel>
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

export default JobDetailComponent;
