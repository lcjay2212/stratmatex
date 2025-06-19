import { AxiosError } from "axios";
import { toast } from "sonner";

type ApiErrorResponse = {
  message?: string;
  error?: string;
  status?: {
    message: string;
  };
  data?: {
    message: string;
  };
  errors?: Record<string, string | string[]>;
};

export function showApiErrors(error: unknown) {
  const axiosError = error as AxiosError<ApiErrorResponse>;
  const responseData = axiosError.response?.data;

  if (!responseData) {
    toast.error("An unexpected error occurred.", {
      duration: 3000,
      richColors: true,
    });
    return;
  }

  const { errors } = responseData;
  const fallbackMessage =
    responseData.message ||
    responseData.error ||
    responseData.data?.message ||
    responseData.status?.message ||
    "An unexpected error occurred.";

  if (errors && typeof errors === "object") {
    Object.values(errors).forEach((error) => {
      const errorMessage = Array.isArray(error) ? error[0] : error;
      toast.error(errorMessage || fallbackMessage, {
        duration: 3000,
        richColors: true,
      });
    });
  } else {
    toast.error(fallbackMessage, {
      duration: 3000,
      richColors: true,
    });
  }
}
