import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfileService } from "services/api/userAPI";

const useUserProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserProfileService,
    onSuccess: (res) => {
      queryClient.setQueryData(["user", "profile"], res.data);
      queryClient.setQueryData(["user", "auth"], (oldData) => {
        return {
          ...oldData,
          data: { ...oldData.data, avatar: res.data.avatar },
        };
      });
    },
  });
};

export { useUserProfileMutation };
