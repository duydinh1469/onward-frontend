import styles from "./styles.module.scss";
import FilterBarComponent from "component/candidate/ListJobsPage/FilterBarComponent/FilterBarComponent";
import JobDetailComponent from "component/candidate/ListJobsPage/JobDetailComponent/JobDetailComponent";
import ListJobsComponent from "component/candidate/ListJobsPage/ListJobsComponent/ListJobsComponent";
import Loading from "component/shared/Loading/Loading";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useCityQuery,
  useJobTypeQuery,
} from "services/apiQueries/queries/publicQueries";

const timeSelect = [
  {
    value: 3,
    label: "3 ngày trước",
  },
  {
    value: 7,
    label: "1 tuần trước",
  },
  {
    value: 14,
    label: "2 tuần trước",
  },
  {
    value: 30,
    label: "1 tháng trước",
  },
];

function ListJobsPage() {
  const [isURLSet, setIsURLSet] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const cityQuery = useCityQuery("VN");
  const typeQuery = useJobTypeQuery();

  useEffect(() => {
    if (cityQuery.data && typeQuery.data && timeSelect) {
      let updatedSearchParams = new URLSearchParams(searchParams.toString());

      const locationCheck = searchParams.get("loc")
        ? searchParams
            .get("loc")
            .split(",")
            .map((val) =>
              cityQuery?.data?.find((loc) => loc.id === parseInt(val))
            )
            .filter((item) => item !== undefined)
        : [];
      locationCheck.length > 0
        ? updatedSearchParams.set(
            "loc",
            locationCheck.map((item) => item.id).join(",")
          )
        : updatedSearchParams.delete("loc");

      timeSelect.find(
        (item) => item.value === parseInt(searchParams.get("from"))
      ) === undefined && updatedSearchParams.delete("from");

      typeQuery?.data?.find(
        (item) => item.id === parseInt(searchParams.get("type"))
      ) === undefined && updatedSearchParams.delete("type");

      updatedSearchParams.toString() === searchParams.toString()
        ? !isURLSet && setIsURLSet(true)
        : setSearchParams(updatedSearchParams.toString());
    }
  }, [searchParams, cityQuery.data, typeQuery.data]);

  return (
    <>
      {isURLSet ? (
        <>
          <FilterBarComponent
            cityArray={cityQuery.data.map((city) => {
              return { value: city.id, label: city.name };
            })}
            typeArray={typeQuery.data.map((workType) => {
              return { value: workType.id, label: workType.type };
            })}
            timeArray={timeSelect}
          />
          <div className={styles.listJobsPageContainer}>
            <div>
              <ListJobsComponent />
            </div>
            <div>
              <JobDetailComponent />
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default ListJobsPage;
