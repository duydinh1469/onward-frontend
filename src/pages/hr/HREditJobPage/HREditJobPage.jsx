import {
  useCityQuery,
  useCurrencyQuery,
  useJobTypeQuery,
} from "services/apiQueries/queries/publicQueries";
import styles from "./styles.module.scss";
import HRJobFormComponent from "component/hr/HRModifyJob/HRJobFormComponent/HRJobFormComponent";
import { useHrJobDetailQuery } from "services/apiQueries/queries/hrQueries";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditJobMutation,
  useDeleteJobMutation,
  useVisibleJobMutation,
} from "services/apiQueries/mutations/hrMutation";
import Loading from "component/shared/Loading/Loading";
import NoData from "component/shared/NoData/NoData";
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

function HREditJobPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const jobTypeQuery = useJobTypeQuery();
  const cityQuery = useCityQuery();
  const currencyQuery = useCurrencyQuery();
  const jobDetailQuery = useHrJobDetailQuery(jobId);
  const editJobMutation = useEditJobMutation(jobId);
  const deleteJobMutation = useDeleteJobMutation(jobId);
  const visibleJobMutation = useVisibleJobMutation(jobId);

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
      // Visible
      visible: data.jobVisible,
    };
    editJobMutation.mutate(requestData, {
      onSuccess: () => {
        navigate("/hr/jobs");
        toast.success("Update job successfully");
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const handleDelete = () => {
    deleteJobMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/hr/jobs");
        toast.success("Delete successfully");
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const handleVisible = (payload) => {
    visibleJobMutation.mutate(payload, {
      onSuccess: () => {
        navigate("/hr/jobs");
        toast.success("Update job's status successfully");
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  if (
    cityQuery.isError ||
    jobTypeQuery.isError ||
    currencyQuery.isError ||
    jobDetailQuery.isError
  ) {
    return <NoData />;
  }

  if (
    cityQuery.isLoading ||
    jobTypeQuery.isLoading ||
    currencyQuery.isLoading ||
    jobDetailQuery.isLoading
  ) {
    return <Loading />;
  }

  return (
    <HRJobFormComponent
      isUpdate={true}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      handleActivate={(payload) => handleVisible(payload)}
      pageData={{
        jobTitle: jobDetailQuery.data.title,
        jobDescription: jobDetailQuery.data.description,
        jobBenefit: jobDetailQuery.data.benefit,
        jobRequirement: jobDetailQuery.data.requirement,
        jobType: jobDetailQuery.data.workTypes.map((item) => {
          return { value: item.id, label: item.type };
        }),
        jobHiredAmount: jobDetailQuery.data.recruitAmount,
        jobCity: jobDetailQuery.data.cities.map((city) => {
          return { value: city.id, label: city.name };
        }),
        jobMaxSalary: jobDetailQuery.data.maxSalary,
        jobMinSalary: jobDetailQuery.data.minSalary,
        jobSalaryCurrency: jobDetailQuery.data.currencyId,
        jobPackage: jobPackage[0].value,
        jobVisible: jobDetailQuery.data.visible,
      }}
      expiredDate={new Date(jobDetailQuery.data.expiredAt)}
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
  );
}

export default HREditJobPage;
