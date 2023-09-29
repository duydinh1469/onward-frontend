import { useQuery } from "@tanstack/react-query";
import { getCompanyProfileService } from "services/api/managerAPI";

const useCompanyInfoQuery = () => {
  return useQuery({
    queryKey: ["manager", "compInfo"],
    queryFn: async () => {
      const res = await getCompanyProfileService();
      return res.data;
    },
  });
};

export { useCompanyInfoQuery };
