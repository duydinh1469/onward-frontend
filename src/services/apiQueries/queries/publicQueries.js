import { useQuery } from "@tanstack/react-query";
import {
  allJobsService,
  cityService,
  companyDetailService,
  companyJobsService,
  companyScaleService,
  currencyService,
  jobDetailService,
  jobTypeService,
} from "services/api/publicAPI";

const useCityQuery = (countryCode) => {
  return useQuery({
    queryKey: ["city"],
    queryFn: () => cityService({ countryCode: countryCode || "VN" }),
    staleTime: 10 * 60 * 1000,
  });
};

const useCompanyScaleQuery = () => {
  return useQuery({
    queryKey: ["company", "scale"],
    queryFn: () => companyScaleService(),
    staleTime: 10 * 60 * 1000,
  });
};

const useJobTypeQuery = () => {
  return useQuery({
    queryKey: ["jobType"],
    queryFn: () => jobTypeService(),
    staleTime: 10 * 60 * 1000,
  });
};

const useCurrencyQuery = () => {
  return useQuery({
    queryKey: ["currency"],
    queryFn: () => currencyService(),
    staleTime: 5 * 60 * 1000,
  });
};

const useListJobQuery = (filterData) => {
  return useQuery({
    queryKey: ["public", "jobs", filterData],
    queryFn: async () => {
      const res = await allJobsService(filterData);
      return res.data;
    },
    enabled: Boolean(filterData),
  });
};

const useJobDetailQuery = (id) => {
  return useQuery({
    queryKey: ["public", "jobDetail", id],
    queryFn: async () => {
      const res = await jobDetailService(id);
      return res.data;
    },
    enabled: Boolean(id),
  });
};

const useCompanyDetailQuery = (compId) => {
  return useQuery({
    queryKey: ["public", "companyDetail", compId],
    queryFn: async () => {
      const res = await companyDetailService(compId);
      return res.data;
    },
    enabled: Boolean(compId),
  });
};

const useCompanyJobsQuery = (compId, filter) => {
  return useQuery({
    queryKey: ["public", "companyJobs", compId, filter],
    queryFn: async () => {
      const res = await companyJobsService(compId, filter);
      return res.data;
    },
    enabled: Boolean(compId),
  });
};

export {
  useCityQuery,
  useCompanyScaleQuery,
  useJobTypeQuery,
  useCurrencyQuery,
  useListJobQuery,
  useJobDetailQuery,
  useCompanyDetailQuery,
  useCompanyJobsQuery,
};
