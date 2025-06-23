import api from "@/utils/api";
import { showApiErrors } from "@/utils/showApiErrors";
import { useQuery } from "@tanstack/react-query";

export const useActiveBids = () => {
  return useQuery({
    queryKey: ["active-bids"],
    queryFn: async () => {
      try {
        const { data } = await api.get(`web/smx/active-bids`, {
          headers: {
            Version: "2",
          },
        });
        return data?.data;
      } catch (error) {
        showApiErrors(error);
      }
    },
  });
};
