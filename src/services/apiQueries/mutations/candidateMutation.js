import { useMutation } from "@tanstack/react-query";
import {
  applyJobService,
  favoriteJobService,
  followCompanyService,
  removeFavoriteJobService,
  reportJobService,
  unFollowCompanyService,
} from "services/api/candidateAPI";

const useFavoriteJobMutation = (onSuccess) => {
  return useMutation({
    mutationFn: favoriteJobService,
    onSuccess: onSuccess,
  });
};

const useRemoveFavoriteJobMutation = (onSuccess) => {
  return useMutation({
    mutationFn: removeFavoriteJobService,
    onSuccess: onSuccess,
  });
};

const useApplyJobMutation = () => {
  return useMutation({
    mutationFn: applyJobService,
  });
};

const useReportJobMutation = () => {
  return useMutation({
    mutationFn: reportJobService,
  });
};

const useFollowCompanyMutation = (onSuccess) => {
  return useMutation({
    mutationFn: followCompanyService,
    onSuccess: onSuccess,
  });
};

const useUnFollowCompanyMutation = (onSuccess) => {
  return useMutation({
    mutationFn: unFollowCompanyService,
    onSuccess: onSuccess,
  });
};

export {
  useFavoriteJobMutation,
  useRemoveFavoriteJobMutation,
  useApplyJobMutation,
  useReportJobMutation,
  useFollowCompanyMutation,
  useUnFollowCompanyMutation,
};
