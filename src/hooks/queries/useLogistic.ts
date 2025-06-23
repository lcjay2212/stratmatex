import api from "@/utils/api";
import { showApiErrors } from "@/utils/showApiErrors";
import { useQuery } from "@tanstack/react-query";

export const useLogistic = () => {
  return useQuery({
    queryKey: ["logistic"],
    queryFn: async () => {
      try {
        const { data } = await api.get(`web/smx/logistic/shipping`, {
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
