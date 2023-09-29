import styles from "./styles.module.scss";
import CustomCard from "component/shared/CustomCard/CustomCard";
import { useCandidateListFollowQuery } from "services/apiQueries/queries/candidateQueries";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useUnFollowCompanyMutation } from "services/apiQueries/mutations/candidateMutation";
import CustomPagination from "component/shared/CustomPagination/CustomPagination";
import Button from "component/shared/Button/Button";
import { LocationOn, Link, Bookmark } from "@mui/icons-material";
import Loading from "component/shared/Loading/Loading";
import NoData from "component/shared/NoData/NoData";

function CandidateListFollowPage() {
  const pageSize = 3;
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParams.get("p")) || 1);

  const queryClient = useQueryClient();
  const listFollow = useCandidateListFollowQuery({
    page: page,
    pageSize: pageSize,
  });
  const unFollowMutation = useUnFollowCompanyMutation();

  useEffect(() => {
    const currentPage = parseInt(searchParams.get("p"));
    if (!isNaN(currentPage) && listFollow?.data?.totalCount) {
      const maxPage = Math.ceil(listFollow.data.totalCount / pageSize);
      if (currentPage > maxPage) {
        const updatedSearchParams = new URLSearchParams(
          searchParams.toString()
        );
        updatedSearchParams.set("p", maxPage);
        setSearchParams(updatedSearchParams.toString());
        setPage(maxPage);
      }
    }
  }, [searchParams, listFollow?.data]);

  const handlePageChange = (page) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set("p", page);
    setSearchParams(updatedSearchParams.toString());
    setPage(page);
  };

  const handleFollowCompany = (event, id) => {
    event.stopPropagation();
    unFollowMutation.mutate(id, {
      onSuccess: () =>
        queryClient.removeQueries({
          queryKey: [
            "candidate",
            "listFollow",
            {
              page: page,
              pageSize: pageSize,
            },
          ],
        }),
    });
  };

  const handleOnClick = (id) => {
    window.open(
      `${window.location.origin}/company/${id}`,
      "rel=noopener noreferrer"
    );
  };

  return (
    <>
      <h1 className={styles.listFollowTitle}>Following List</h1>
      {!listFollow?.data ? (
        <Loading />
      ) : listFollow.data.companies.length > 0 ? (
        <>
          {listFollow.data.companies.map((comp) => (
            <CustomCard
              key={comp.id}
              cardImage={comp.avatar}
              onClick={() => handleOnClick(comp.id)}
            >
              <p className={styles.compFollowName}>{comp.name}</p>
              <div className={styles.compFollowDetail}>
                <div className={styles.compFollowExtra}>
                  <Link fontSize="small" />
                  <p>
                    <span>Website:</span> {comp.website}
                  </p>
                </div>
                <div className={styles.compFollowExtra}>
                  <LocationOn fontSize="small" />
                  <p>
                    <span>Address:</span>{" "}
                    {`${comp.address}, ${comp.district.name}, ${comp.district.city.name}`}
                  </p>
                </div>
                <div className={styles.compFollowExtra}>
                  <Bookmark fontSize="small" />
                  <p>
                    <span>Follower:</span> {comp.followNumber}
                  </p>
                </div>
              </div>
              <Button
                onClickFnc={(event) => handleFollowCompany(event, comp.id)}
                extraStyle={{
                  padding: "0.2rem 1.5rem",
                  marginTop: "2rem",
                }}
                type="extraFill"
                size="small"
              >
                Followed !
              </Button>
            </CustomCard>
          ))}
          <CustomPagination
            totalPage={Math.ceil(listFollow.data.totalCount / pageSize)}
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

export default CandidateListFollowPage;
