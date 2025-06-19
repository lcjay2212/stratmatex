import { storage } from "@/constant/storage";
import api from "@/utils/api";
import { showApiErrors } from "@/utils/showApiErrors";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

const useSignIn = () => {
  // const [step, setStep] = useState<number>(1);

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

        // setStep(2);

        if (data?.status.success) {
          toast.success("Verify OTP success", {
            duration: 5000,
            richColors: true,
          });
          localStorage.setItem(
            storage.SMX_USER_DETAILS,
            JSON.stringify(data.data)
          );
          localStorage.setItem(storage.SMX_USER_TOKEN, data.data.token);
          localStorage.setItem(storage.REFRESH_TOKEN, data.data.refresh_token);
          // setUser(JSON.parse(localStorage.QUX_USER_DETAILS));
          Cookies.set("auth-token", data.token, {
            expires: 7, // 7 days
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
        }

        return data?.data;
      } catch (error) {
        showApiErrors(error);
      }
    },
  });

  return {
    signIn,
    isPending,
    // step,
    data,
  };
};

export default useSignIn;
