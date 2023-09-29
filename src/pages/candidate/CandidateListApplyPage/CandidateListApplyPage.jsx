import styles from "./styles.module.scss";
import { useCandidateListApplyQuery } from "services/apiQueries/queries/candidateQueries";
import JobCard from "component/shared/JobCard/JobCard";
import { useEffect, useState } from "react";
import { Chip, Tooltip } from "@mui/material";
import {
  BlockOutlined,
  Favorite,
  FavoriteBorder,
  FlagOutlined,
  RunningWithErrors,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  useFavoriteJobMutation,
  useRemoveFavoriteJobMutation,
} from "services/apiQueries/mutations/candidateMutation";
import { useQueryClient } from "@tanstack/react-query";
import { compareAsc } from "date-fns";
import { useSearchParams } from "react-router-dom";
import CustomPagination from "component/shared/CustomPagination/CustomPagination";
import Loading from "component/shared/Loading/Loading";
import NoData from "component/shared/NoData/NoData";
import Error404 from "component/shared/Error404/Error404";

function CandidateListApplyPage() {
  const pageSize = 3;
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParams.get("p")) || 1);

  const queryClient = useQueryClient();
  const listApply = useCandidateListApplyQuery({
    page: page,
    pageSize: pageSize,
  });

  useEffect(() => {
    const currentPage = parseInt(searchParams.get("p"));
    if (!isNaN(currentPage) && listApply?.data?.totalCount) {
      const maxPage = Math.ceil(listApply.data.totalCount / pageSize);
      if (currentPage > maxPage) {
        const updatedSearchParams = new URLSearchParams(
          searchParams.toString()
        );
        updatedSearchParams.set("p", maxPage);
        setSearchParams(updatedSearchParams.toString());
        setPage(maxPage);
      }
    }
  }, [searchParams, listApply?.data]);

  const handlePageChange = (page) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set("p", page);
    setSearchParams(updatedSearchParams.toString());
    setPage(page);
  };

  const favoriteMutation = useFavoriteJobMutation();

  const removeFavoriteMutation = useRemoveFavoriteJobMutation();

  const handleFavoriteJob = (event, isMarked, id) => {
    event.stopPropagation();
    isMarked
      ? removeFavoriteMutation.mutate(id, {
          onSuccess: () =>
            queryClient.setQueryData(
              [
                "candidate",
                "listApply",
                {
                  page: page,
                  pageSize: pageSize,
                },
              ],
              (oldData) => {
                return {
                  ...oldData,
                  jobs: oldData.jobs.map((job) =>
                    job.id === id ? { ...job, isMarked: false } : job
                  ),
                };
              }
            ),
        })
      : favoriteMutation.mutate(id, {
          onSuccess: () =>
            queryClient.setQueryData(
              [
                "candidate",
                "listApply",
                {
                  page: page,
                  pageSize: pageSize,
                },
              ],
              (oldData) => {
                return {
                  ...oldData,
                  jobs: oldData.jobs.map((job) =>
                    job.id === id ? { ...job, isMarked: true } : job
                  ),
                };
              }
            ),
        });
  };

  const handleReportJob = (isReported, id) => {
    !isReported && handleOnClick(id);
  };

  const handleOnClick = (id) => {
    window.open(
      `${window.location.origin}/job/${id}`,
      "rel=noopener noreferrer"
    );
  };

  if (listApply.isError) return <Error404 />;
  return (
    <>
      <h1 className={styles.listApplyTitle}>Applied Jobs</h1>
      {listApply.isLoading ? (
        <Loading />
      ) : listApply?.data?.jobs?.length > 0 ? (
        <>
          {listApply.data.jobs.map((job) => {
            const status = job.visible
              ? compareAsc(new Date(), new Date(job.expiredAt)) >= 0
                ? "Expired"
                : "Active"
              : "Inactive";
            return (
              <div style={{ position: "relative" }} key={job.id}>
                <JobCard
                  onClick={handleOnClick}
                  cardData={{
                    id: job.id,
                    position: job.title,
                    location: job.cities.map((city) => {
                      return { value: city.id, label: city.name };
                    }),
                    postDate: job.updateAt,
                    company: job.company,
                    requirement: job.requirement,
                  }}
                  cardAction={
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className={styles.listApplyActionContainer}
                    >
                      <Tooltip
                        title={job.isMarked ? "Favorited!" : "Favorite now"}
                      >
                        <div
                          onClick={(event) =>
                            handleFavoriteJob(event, job.isMarked, job.id)
                          }
                          className={styles.listApplyActionBtn}
                          data-isselected={job.isMarked}
                        >
                          {job.isMarked ? (
                            <>
                              <Favorite sx={{ color: "#FF5A5A" }} />{" "}
                              <span>Liked</span>
                            </>
                          ) : (
                            <>
                              <FavoriteBorder /> <span>Like</span>
                            </>
                          )}
                        </div>
                      </Tooltip>

                      <Tooltip
                        title={job.isReported ? "Reported!" : "Send Report"}
                      >
                        <div
                          onClick={() =>
                            handleReportJob(job.isReported, job.id)
                          }
                          disabled={job.isReported}
                          className={styles.listApplyActionBtn}
                          data-isselected={job.isReported}
                        >
                          {job.isReported ? (
                            <>
                              <BlockOutlined sx={{ color: "red" }} />{" "}
                              <span>Reported</span>
                            </>
                          ) : (
                            <>
                              <FlagOutlined /> <span>Report</span>
                            </>
                          )}
                        </div>
                      </Tooltip>
                    </div>
                  }
                />
                <div className={styles.listApplyChip}>
                  <Chip
                    label={status}
                    size="small"
                    sx={{ width: "7em" }}
                    color={
                      status === "Active"
                        ? "success"
                        : status === "Expired"
                        ? "error"
                        : "warning"
                    }
                    icon={
                      status === "Active" ? (
                        <Visibility />
                      ) : status === "Expired" ? (
                        <RunningWithErrors />
                      ) : (
                        <VisibilityOff />
                      )
                    }
                  />
                </div>
              </div>
            );
          })}

          <CustomPagination
            totalPage={Math.ceil(listApply.data.totalCount / pageSize)}
            current={page}
            onChange={handlePageChange}
            range={5}
          />
        </>
      ) : (
        <NoData />
      )}
    </>
  );
}

export default CandidateListApplyPage;
