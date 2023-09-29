import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useHrListJobsQuery } from "services/apiQueries/queries/hrQueries";
import HRJobCard from "component/hr/HRJobs/HRJobCard/HRJobCard";
import { compareAsc } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomPagination from "component/shared/CustomPagination/CustomPagination";
import Error404 from "component/shared/Error404/Error404";
import Loading from "component/shared/Loading/Loading";
import NoData from "component/shared/NoData/NoData";
import { useQueryClient } from "@tanstack/react-query";
import HRActivateNotice from "component/hr/HRActivateNotice/HRActivateNotice";

function HRListJobsPage() {
  const pageSize = 5;
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterData, setFilterData] = useState(null);
  const queryClient = useQueryClient();
  const { isVerified } = queryClient.getQueryData(["hr", "company", "profile"]);

  const listJobs = useHrListJobsQuery(filterData);

  useEffect(() => {
    let updatedSearchParams = new URLSearchParams(searchParams.toString());
    const maxPage = Math.ceil(listJobs?.data?.totalCount / pageSize);
    !Number.isInteger(parseInt(searchParams.get("p"))) &&
      updatedSearchParams.set("p", 1);
    parseInt(searchParams.get("p")) > maxPage &&
      updatedSearchParams.set("p", maxPage);

    updatedSearchParams.toString() !== searchParams.toString() &&
      setSearchParams(updatedSearchParams.toString(), { replace: true });

    setFilterData({
      page: parseInt(searchParams.get("p")) || 1,
      pageSize: pageSize,
      orderBy: "desc",
    });
  }, [searchParams, listJobs?.data]);

  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/hr/jobs/edit/${id}`);
  };
  const handleCandidate = (id) => {
    navigate(`/hr/jobs/candidate/${id}`);
  };

  const handlePageChange = (page) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set("p", page);
    setSearchParams(updatedSearchParams.toString());
  };

  if (listJobs.isError) return <Error404 />;
  if (listJobs.isLoading) return <Loading />;

  return (
    <>
      {isVerified ? (
        <>
          <h2 className={styles.hrListJobsHeader}>List Jobs</h2>
          {listJobs?.data?.jobs?.length > 0 ? (
            <>
              <div className={styles.hrListJobsContainer}>
                {listJobs.data.jobs.map((job) => {
                  return (
                    <HRJobCard
                      cardInfo={{
                        jobTitle: job.title,
                        jobUpdatedDate: job.updateAt,
                        jobExpiredDate: job.expiredAt,
                        jobCreatedBy: job.authors.map(
                          (author) => author.user.email
                        ),
                        jobStatus:
                          job.visible &&
                          compareAsc(new Date(job.expiredAt), new Date()) >= 0
                            ? "active"
                            : compareAsc(
                                new Date(job.expiredAt),
                                new Date()
                              ) === -1
                            ? "expired"
                            : "inactive",
                      }}
                      handleEdit={() => handleEdit(job.id)}
                      handleCandidate={() => handleCandidate(job.id)}
                      key={job.id}
                    />
                  );
                })}
              </div>
              <CustomPagination
                totalPage={Math.ceil(listJobs.data.totalCount / pageSize)}
                current={parseInt(searchParams.get("p"))}
                onChange={handlePageChange}
                range={5}
              />
            </>
          ) : (
            <NoData />
          )}
        </>
      ) : (
        <HRActivateNotice />
      )}
    </>
  );
}

export default HRListJobsPage;
