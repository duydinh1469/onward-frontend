import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  attendanceService,
  updateCompanyProfileService,
} from "services/api/managerAPI";

const useCompanyInfoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCompanyProfileService,
    onSuccess: (res) => {
      queryClient.setQueryData(["manager", "compInfo"], res.data);
      queryClient.setQueryData(["hr", "company", "profile"], (oldData) => {
        return { ...oldData, avatar: res.data.avatar };
      });
    },
  });
};

const useCompanyAttendanceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: attendanceService,
    onSuccess: (res) => {
      queryClient.setQueryData(["hr", "company", "points"], {
        points: res.data.points,
      });
      queryClient.setQueryData(["hr", "company", "profile"], (oldData) => {
        return {
          ...oldData,
          points: res.data.points,
          loginDate: res.data.loginDate,
        };
      });
    },
  });
};
export { useCompanyInfoMutation, useCompanyAttendanceMutation };
