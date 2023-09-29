import { useQuery } from "@tanstack/react-query";
import {
  getCompanyJobDetailService,
  getCompanyListJobsService,
  getHrCompanyGeneralProfile,
  getHrCompanyPoints,
  getJobCandidateService,
} from "services/api/hrAPI";

const useHrListJobsQuery = (pageData) => {
  return useQuery({
    queryKey: ["hr", "listjobs", pageData],
    queryFn: async () => {
      const res = await getCompanyListJobsService(pageData);
      return res.data;
    },
    enabled: Boolean(pageData),
  });
};

const useHrJobDetailQuery = (id) => {
  return useQuery({
    queryKey: ["hr", "job", "detail", id],
    queryFn: async () => {
      const res = await getCompanyJobDetailService(id);
      return res.data;
    },
  });
};

const useHrJobCandidatesQuery = (id, pageData) => {
  return useQuery({
    queryKey: ["hr", "job", "candidates", id, pageData],
    queryFn: async () => {
      const res = await getJobCandidateService(id, pageData);
      return res.data;
    },
    enabled: Boolean(id) && Boolean(pageData),
  });
};

const useHrCompanyGeneralProfile = () => {
  return useQuery({
    queryKey: ["hr", "company", "profile"],
    queryFn: async () => {
      const res = await getHrCompanyGeneralProfile();
      return res.data;
    },
  });
};

const useHrCompanyPoints = () => {
  return useQuery({
    queryKey: ["hr", "company", "points"],
    queryFn: async () => {
      const res = await getHrCompanyPoints();
      return res.data;
    },
  });
};

export {
  useHrListJobsQuery,
  useHrJobDetailQuery,
  useHrJobCandidatesQuery,
  useHrCompanyGeneralProfile,
  useHrCompanyPoints,
};
