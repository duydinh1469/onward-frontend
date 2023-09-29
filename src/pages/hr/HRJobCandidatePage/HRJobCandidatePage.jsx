import { Link, useParams, useSearchParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useHrJobCandidatesQuery } from "services/apiQueries/queries/hrQueries";
import { useEffect, useState } from "react";
import CustomPagination from "component/shared/CustomPagination/CustomPagination";
import CustomCard from "component/shared/CustomCard/CustomCard";
import NoData from "component/shared/NoData/NoData";
import Error404 from "component/shared/Error404/Error404";
import Loading from "component/shared/Loading/Loading";

function HRJobCandidatePage() {
  const { jobId } = useParams();
  const pageSize = 5;
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterData, setFilterData] = useState(null);

  const listCandidate = useHrJobCandidatesQuery(jobId, filterData);

  useEffect(() => {
    let updatedSearchParams = new URLSearchParams(searchParams.toString());
    const maxPage = Math.ceil(listCandidate?.data?.totalCount / pageSize);
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
  }, [searchParams, listCandidate?.data]);

  const handlePageChange = (page) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set("p", page);
    setSearchParams(updatedSearchParams.toString());
  };

  // if(!jobId) return
  if (listCandidate.isError) return <Error404 />;
  if (listCandidate.isLoading) return <Loading />;

  return (
    <>
      <h2 className={styles.hrListCandidatesHeader}>
        List Candidate:{" "}
        <Link to={`/hr/jobs/edit/${listCandidate?.data?.job?.id}`}>
          {listCandidate?.data?.job?.title}
        </Link>
      </h2>
      {listCandidate?.data?.candidates?.length > 0 ? (
        <>
          <div className={styles.hrListCandidateContainer}>
            {listCandidate.data.candidates.map((candidate) => (
              <CustomCard
                cardImage={candidate.avatar}
                className={styles.candidateCard}
                key={candidate.email}
              >
                <p className={styles.candidateCardName}>
                  {candidate.givenName} {candidate.surname}
                </p>
                <p className={styles.candidateCardEmail}>
                  <span>Email:</span> {candidate.email}
                </p>
                <a
                  href={candidate.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.candidateCardCV}
                >
                  <i className="fa-solid fa-download"></i> Download CV
                </a>
              </CustomCard>
            ))}
          </div>
          <CustomPagination
            totalPage={Math.ceil(listCandidate.data.totalCount / pageSize)}
            current={parseInt(searchParams.get("p"))}
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

export default HRJobCandidatePage;
