import CustomPagination from "component/shared/CustomPagination/CustomPagination";
import JobCard from "component/shared/JobCard/JobCard";
import { useState } from "react";
import styles from "./styles.module.scss";
import { useListJobQuery } from "services/apiQueries/queries/publicQueries";
import NoData from "component/shared/NoData/NoData";
import Loading from "component/shared/Loading/Loading";
import { useNavigate } from "react-router-dom";

function ListRecentJobsComponent() {
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const recentJobsQuery = useListJobQuery({
    page: currentPage,
    pageSize: pageSize,
    searchPhrase: " ",
    //fromDate:
  });

  const navigate = useNavigate();

  const onChangePagination = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.recentJobContainer}>
      <h2 className={styles.recentJobTitle}>Việc làm hôm nay</h2>
      {recentJobsQuery.isError ? (
        <NoData />
      ) : recentJobsQuery.isLoading ? (
        <Loading />
      ) : recentJobsQuery?.data?.jobs?.length > 0 ? (
        <>
          <div className={styles.recentJobList}>
            {recentJobsQuery.data.jobs.map((item) => (
              <JobCard
                key={item.id}
                onClick={() => navigate(`/job/${item.id}`)}
                cardData={{
                  id: item.id,
                  position: item.title,
                  location: item.cities.map((city) => {
                    return { value: city.id, label: city.name };
                  }),
                  postDate: item.updateAt,
                  company: item.company,
                  requirement: item.requirement,
                }}
              />
            ))}
          </div>
          <CustomPagination
            totalPage={Math.min(
              Math.ceil(recentJobsQuery?.data?.totalCount / pageSize),
              5
            )}
            current={currentPage}
            onChange={onChangePagination}
            range={5}
          />
        </>
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default ListRecentJobsComponent;
