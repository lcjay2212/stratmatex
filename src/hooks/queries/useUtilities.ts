import { Utilities } from "@/types/utilities";
import api from "@/utils/api";
import { showApiErrors } from "@/utils/showApiErrors";
import { useQuery } from "@tanstack/react-query";

export const useUtilities = () => {
  return useQuery<Utilities>({
    queryKey: ["utilities"],
    queryFn: async () => {
      try {
        const { data } = await api.get(`web/smx/utilities`, {
          headers: {
            Version: 2,
          },
        });
        return data?.data;
      } catch (error) {
        showApiErrors(error);
      }
    },
  });
};
