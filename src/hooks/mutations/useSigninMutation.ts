import { storage } from "@/constant/storage";
import { useUser } from "@/store/useUser";
import api from "@/utils/api";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useSignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const {
    mutateAsync: signIn,
    isPending,
    data,
  } = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (variable: { email: string; password: string }) => {
      try {
        const { data } = await api.post(`web/login`, variable, {
          headers: {
            Version: 1,
          },
        });

        if (data?.status.success) {
          toast.success(data?.status.message, {
            duration: 5000,
            richColors: true,
          });

          // Store user data and tokens
          localStorage.setItem(
            storage.SMX_USER_DETAILS,
            JSON.stringify(data.data)
          );
          localStorage.setItem(storage.SMX_USER_TOKEN, data.data.token);
          localStorage.setItem(storage.REFRESH_TOKEN, data.data.refresh_token);

          // Fix: Use correct storage key for parsing
          setUser(
            JSON.parse(localStorage.getItem(storage.SMX_USER_DETAILS) || "{}")
          );

          // Fix: Use data.data.token instead of data.token
          Cookies.set("auth-token", data.data.token, {
            expires: 7, // 7 days
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });

          navigate("/");
        }

        return data?.data;
      } catch (error) {
        showApiErrors(error);
        // Re-throw the error so the mutation can handle it properly
        throw error;
      }
    },
  });

  return {
    signIn,
    isPending,
    data,
  };
};

export default useSignIn;
