import { useUser } from "@/store/useUser";
import { useEffect } from "react";

export const useLogoutListener = () => {
  const { setUser } = useUser();

  useEffect(() => {
    const handleClearUserStore = () => {
      setUser(null);
    };

    // Listen for the custom event to clear user store
    window.addEventListener("clear-user-store", handleClearUserStore);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("clear-user-store", handleClearUserStore);
    };
  }, [setUser]);
};
