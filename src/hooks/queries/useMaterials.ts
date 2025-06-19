import api from "@/utils/api";
import { showApiErrors } from "@/utils/showApiErrors";
import { useQuery } from "@tanstack/react-query";

export interface Material {
  id: string;
  material_name: string;
  base_price: string;
  image: string | null;
  seller: string;
  volume: string;
  origin: string;
  active_bids: number;
  description: string;
  technical_properties: string;
  quantity: number;
  hazmat_category: string | null;
  purchase_type: string;
}

export const useMaterials = () => {
  return useQuery<Material[]>({
    queryKey: ["materials"],
    queryFn: async () => {
      try {
        const { data } = await api.get(`web/smx/marketplace`);
        return data?.data;
      } catch (error) {
        showApiErrors(error);
      }
    },
  });
};
