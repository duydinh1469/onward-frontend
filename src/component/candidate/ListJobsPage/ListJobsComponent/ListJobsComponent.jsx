import styles from "./styles.module.scss";
import JobCard from "component/shared/JobCard/JobCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import sub from "date-fns/sub";
import CustomPagination from "component/shared/CustomPagination/CustomPagination";
import { useListJobQuery } from "services/apiQueries/queries/publicQueries";
import NoData from "component/shared/NoData/NoData";
import Loading from "component/shared/Loading/Loading";
import { useWindowWidth } from "hooks/useWindowWidth";

function ListJobsComponent() {
  const pageSize = 5;
  // Check window width and navigate base on window width
  const maxWidth = 1100;
  const width = useWindowWidth();
  const navigate = useNavigate();

  // Fetch data
  const [filterData, setFilterData] = useState(null);
  const allJobsQuery = useListJobQuery(filterData);
  const queryClient = useQueryClient();

  // Internal onClick event change search param using react router useSearchParams
  // React router's hook (SearchParams, Navigate) will make all component subscribe to it rerender => use with consideration
  // change with history.pushState won't rerender but will mess up state of react router and hard to trigger event

  // const handleClickWithHistory = (id) => {
  //   const url = new URL(window.location);
  //   url.searchParams.set("id", id);
  //   window.history.pushState({}, "", url);
  // };
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let updatedSearchParams = new URLSearchParams(searchParams.toString());
    !searchParams.get("id") &&
      allJobsQuery?.data?.jobs?.length > 0 &&
      updatedSearchParams.set("id", allJobsQuery.data.jobs[0].id);

    const maxPage = Math.ceil(allJobsQuery?.data?.totalCount / pageSize);
    !Number.isInteger(parseInt(searchParams.get("p"))) &&
      updatedSearchParams.set("p", 1);
    parseInt(searchParams.get("p")) > maxPage &&
      updatedSearchParams.set("p", maxPage);

    updatedSearchParams.toString() !== searchParams.toString() &&
      setSearchParams(updatedSearchParams.toString(), { replace: true });

    setFilterData({
      page: parseInt(searchParams.get("p")) || 1,
      pageSize: pageSize,
      fromDate: searchParams.get("from")
        ? sub(new Date(), parseInt(searchParams.get("from")))
        : null,
      searchPhrase: searchParams.get("q") ? searchParams.get("q") : " ",
      location: searchParams.get("loc")
        ? searchParams
            .get("loc")
            .split(",")
            .map(
              (val) =>
                queryClient
                  .getQueryData(["city"])
                  ?.find((item) => item.id === parseInt(val))?.id
            )
            .filter((item) => item !== undefined)
        : null,
      type: searchParams.get("type")
        ? parseInt(searchParams.get("type"))
        : null,
    });
  }, [searchParams, allJobsQuery.data]);

  const handleClick = (id) => {
    if (width > maxWidth) {
      let updatedSearchParams = new URLSearchParams(searchParams.toString());
      updatedSearchParams.set("id", id);
      setSearchParams(updatedSearchParams.toString());
    } else {
      navigate(`/job/${id}`);
    }
  };

  const handlePageChange = (page) => {
    let updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.delete("id");
    updatedSearchParams.set("p", page);
    queryClient.removeQueries({ queryKey: ["public", "jobs"] });
    setSearchParams(updatedSearchParams.toString());
  };

  if (allJobsQuery.isError || allJobsQuery?.data?.jobs?.length === 0)
    return <NoData />;
  if (allJobsQuery.isLoading) return <Loading />;

  return (
    <>
      {allJobsQuery.data.jobs.map((item) => (
        <JobCard
          key={item.id}
          onClick={handleClick}
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
      <CustomPagination
        totalPage={Math.ceil(allJobsQuery.data.totalCount / pageSize)}
        current={parseInt(searchParams.get("p"))}
        onChange={handlePageChange}
        range={5}
      />
    </>
  );
}

export default ListJobsComponent;
