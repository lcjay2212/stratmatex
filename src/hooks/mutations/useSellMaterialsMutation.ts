import { SellMaterialsFormValues } from "@/components/@lib/form/types";
import api from "@/utils/api";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useSellMaterials = () => {
  const {
    mutateAsync: sellMaterials,
    isPending,
    data,
    error,
  } = useMutation({
    mutationKey: ["sell-materials"],
    mutationFn: async (formData: SellMaterialsFormValues) => {
      try {
        const submitData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value === undefined || value === null || value === "") {
            return;
          }

          if (key === "files" || key === "resources") {
            // Handle file arrays - only add if there are files
            if (Array.isArray(value) && value.length > 0) {
              value.forEach((file, index) => {
                submitData.append(`${key}[${index}]`, file);
              });
            }
          } else {
            submitData.append(key, String(value));
          }
        });

        const { data } = await api.post(`/web/smx/sell-materials`, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Version: 2,
          },
        });

        if (data?.status.success) {
          toast.success(
            data?.status.message || "Material listing created successfully!",
            {
              duration: 5000,
              richColors: true,
            }
          );
        }

        return data?.data;
      } catch (error) {
        showApiErrors(error);
        throw error;
      }
    },
  });

  return {
    sellMaterials,
    isPending,
    data,
    error,
  };
};

export default useSellMaterials;
