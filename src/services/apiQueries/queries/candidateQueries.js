import { useQuery } from "@tanstack/react-query";
import {
  getAllAppliedJobService,
  getAllFavoriteJobService,
  getAllFollowCompanyService,
  getCVService,
} from "services/api/candidateAPI";

const useCandidateCVQuery = () => {
  return useQuery({
    queryKey: ["candidate", "cv"],
    queryFn: async () => {
      const res = await getCVService();
      return res.data;
    },
  });
};

const useCandidateListApplyQuery = (filter) => {
  return useQuery({
    queryKey: ["candidate", "listApply", filter],
    queryFn: async () => {
      const res = await getAllAppliedJobService(filter);
      return res.data;
    },
  });
};

const useCandidateListFavoriteQuery = (filter) => {
  return useQuery({
    queryKey: ["candidate", "listFavorite", filter],
    queryFn: async () => {
      const res = await getAllFavoriteJobService(filter);
      return res.data;
    },
  });
};

const useCandidateListFollowQuery = (filter) => {
  return useQuery({
    queryKey: ["candidate", "listFollow", filter],
    queryFn: async () => {
      const res = await getAllFollowCompanyService(filter);
      return res.data;
    },
  });
};
export {
  useCandidateCVQuery,
  useCandidateListApplyQuery,
  useCandidateListFavoriteQuery,
  useCandidateListFollowQuery,
};
