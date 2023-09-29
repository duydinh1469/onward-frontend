import { useMutation, useQueryClient } from "@tanstack/react-query";
import { districtService } from "services/api/publicAPI";

const useDistrictMutation = () => {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: districtService,
  });
};

export { useDistrictMutation };
