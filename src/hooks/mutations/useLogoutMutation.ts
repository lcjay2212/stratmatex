import { clearStorage } from "@/utils/clearStorage";
import { queryClient } from "@/utils/queryClient";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUser } from "../../store/useUser";

export const useLogout = (): {
  logout: ({ message }: { message: string }) => Promise<void>;
} => {
  const navigate = useNavigate();
  const setUser = useUser((e) => e.setUser);

  const logout = async ({ message }: { message: string }): Promise<void> => {
    clearStorage(); // Clear storage
    setUser(null); // Set user to null
    toast.success(`${message}`, {
      duration: 5000,
      richColors: true,
    });
    Cookies.remove("auth-token", {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Ensure the user is null before removing queries and redirecting
    await navigate("/"); // Await the router redirection

    // After redirect, safely remove queries
    queryClient.clear();
  };

  return { logout };
};
