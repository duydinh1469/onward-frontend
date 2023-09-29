import {
  useCityQuery,
  useCurrencyQuery,
  useJobTypeQuery,
} from "services/apiQueries/queries/publicQueries";
// import styles from "./styles.module.scss";
import HRJobFormComponent from "component/hr/HRModifyJob/HRJobFormComponent/HRJobFormComponent";
import { usePostJobMutation } from "services/apiQueries/mutations/hrMutation";
import Loading from "component/shared/Loading/Loading";
import Error404 from "component/shared/Error404/Error404";
import { useQueryClient } from "@tanstack/react-query";
import HRActivateNotice from "component/hr/HRActivateNotice/HRActivateNotice";
import { toast } from "react-toastify";

const jobPackage = [
  {
    label: "3 days",
    value: 3,
  },
  {
    label: "7 days",
    value: 7,
  },
  {
    label: "15 days",
    value: 15,
  },
  {
    label: "30 days",
    value: 30,
  },
];

function HRPostJobPage() {
  const jobTypeQuery = useJobTypeQuery();
  const cityQuery = useCityQuery();
  const currencyQuery = useCurrencyQuery();
  const jobMutation = usePostJobMutation();
  const queryClient = useQueryClient();
  const { isVerified } = queryClient.getQueryData(["hr", "company", "profile"]);

  const pageData = {
    jobTitle: "",
    jobDescription: "",
    jobBenefit: "",
    jobRequirement: "",
    jobType: [],
    jobHiredAmount: null,
    jobCity: [],
    jobMaxSalary: null,
    jobMinSalary: null,
    jobSalaryCurrency: currencyQuery?.data?.[0].id || null,
    jobPackage: jobPackage[0].value,
  };

  const handleSubmit = (data) => {
    const requestData = {
      // Job detail
      title: data.jobTitle,
      description: data.jobDescription,
      benefit: data.jobBenefit,
      requirement: data.jobRequirement,
      // General info
      workTypes: data.jobType.map((item) => item.value),
      cities: data.jobCity.map((item) => item.value),
      recruitAmount: parseInt(data.jobHiredAmount),
      minSalary: data.jobMinSalary ? parseInt(data.jobMinSalary) : null,
      maxSalary: data.jobMaxSalary ? parseInt(data.jobMaxSalary) : null,
      currencyId: data.jobSalaryCurrency,
      // Package
      package: parseInt(data.jobPackage),
    };
    jobMutation.mutate(requestData, {
      onSuccess: () => {
        toast.success("Create job successfully");
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  if (cityQuery.isError || jobTypeQuery.isError || currencyQuery.isError)
    return <Error404 />;

  if (cityQuery.isLoading || jobTypeQuery.isLoading || currencyQuery.isLoading)
    return <Loading />;

  return (
    <>
      {isVerified ? (
        <HRJobFormComponent
          handleSubmit={handleSubmit}
          pageData={pageData}
          cityArray={cityQuery.data.map((city) => {
            return { label: city.name, value: city.id };
          })}
          workTypeArray={jobTypeQuery.data.map((jobType) => {
            return { label: jobType.type, value: jobType.id };
          })}
          packageArray={jobPackage}
          currencyArray={currencyQuery.data.map((item) => {
            return { label: item.name, value: item.id };
          })}
        />
      ) : (
        <HRActivateNotice />
      )}
    </>
  );
}

export default HRPostJobPage;
