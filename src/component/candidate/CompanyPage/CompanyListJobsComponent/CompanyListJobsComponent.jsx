import JobCard from "component/shared/JobCard/JobCard";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import CustomPagination from "component/shared/CustomPagination/CustomPagination";
import { useCompanyJobsQuery } from "services/apiQueries/queries/publicQueries";
import NoData from "component/shared/NoData/NoData";
import Loading from "component/shared/Loading/Loading";
import { useWindowWidth } from "hooks/useWindowWidth";

function CompanyListJobsComponent() {
  const pageSize = 5;
  // Check window width and navigate base on window width
  const maxWidth = 1100;
  const width = useWindowWidth();
  const navigate = useNavigate();

  // Company id
  const { companyId } = useParams();
  // Fetch data
  const [filterData, setFilterData] = useState(null);
  const companyJobsQuery = useCompanyJobsQuery(companyId, filterData);
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let updatedSearchParams = new URLSearchParams(searchParams.toString());
    !searchParams.get("id") &&
      companyJobsQuery?.data?.jobs?.length > 0 &&
      updatedSearchParams.set("id", companyJobsQuery.data.jobs[0].id);

    const maxPage = Math.ceil(companyJobsQuery?.data?.totalCount / pageSize);
    !Number.isInteger(parseInt(searchParams.get("p"))) &&
      updatedSearchParams.set("p", 1);
    parseInt(searchParams.get("p")) > maxPage &&
      updatedSearchParams.set("p", maxPage);

    updatedSearchParams.toString() !== searchParams.toString() &&
      setSearchParams(updatedSearchParams.toString(), { replace: true });

    setFilterData({
      page: parseInt(searchParams.get("p")) || 1,
      pageSize: pageSize,
    });
  }, [searchParams, companyJobsQuery.data]);

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

  if (companyJobsQuery.isError) return <NoData />;
  if (companyJobsQuery.isLoading || companyJobsQuery.isFetching)
    return <Loading />;
  if (companyJobsQuery?.data?.jobs?.length === 0) return <NoData />;

  return (
    <>
      {companyJobsQuery.data.jobs.map((item) => (
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
      {parseInt(searchParams.get("p")) && (
        <CustomPagination
          totalPage={Math.ceil(companyJobsQuery.data.totalCount / pageSize)}
          current={parseInt(searchParams.get("p"))}
          onChange={handlePageChange}
          range={5}
        />
      )}
    </>
  );
}

export default CompanyListJobsComponent;
