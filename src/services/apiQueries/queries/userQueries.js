import { useQuery } from "@tanstack/react-query";
import { getUserProfileService } from "services/api/userAPI";

const useUserProfileQuery = () => {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      const res = await getUserProfileService();
      return res.data;
    },
  });
};

export { useUserProfileQuery };
