import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createJobService,
  updateCompanyJobDetailService,
  deleteCompanyJobService,
  updateCompanyJobVisibleService,
} from "services/api/hrAPI";

const usePostJobMutation = (onSuccess) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createJobService,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries(["hr", "listjobs"]);
      queryClient.refetchQueries(["hr", "company", "points"]);
    },
  });
};

const useEditJobMutation = (jobId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => updateCompanyJobDetailService(jobId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["hr", "job", "detail", jobId], {
        exact: true,
      });
      queryClient.invalidateQueries(["hr", "listjobs"]);
      queryClient.refetchQueries(["hr", "company", "points"]);
    },
  });
};

const useDeleteJobMutation = (jobId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => deleteCompanyJobService(jobId, payload),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["hr", "job", "detail", jobId] });
      queryClient.invalidateQueries(["hr", "listjobs"]);
    },
  });
};

const useVisibleJobMutation = (jobId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => updateCompanyJobVisibleService(jobId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["hr", "job", "detail", jobId], {
        exact: true,
      });
      queryClient.invalidateQueries(["hr", "listjobs"]);
    },
  });
};

export {
  usePostJobMutation,
  useEditJobMutation,
  useDeleteJobMutation,
  useVisibleJobMutation,
};
