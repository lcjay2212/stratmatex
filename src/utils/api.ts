import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { clearStorage } from "./clearStorage";
import { queryClient } from "./queryClient";

const isBrowser = typeof window !== "undefined";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_BASE_URL,
});

let isRefreshing = false;

type FailedRequest = {
  resolve: (token: string | null) => void;
  reject: (error: AxiosError) => void;
};

let failedQueue: FailedRequest[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

// Function to handle logout when token is expired
const handleLogout = async (
  message: string = "Session expired. Please login again."
) => {
  if (isBrowser) {
    try {
      // Clear all storage
      clearStorage();

      // Remove auth cookie
      Cookies.remove("auth-token", {
        secure: import.meta.env.MODE === "production",
        sameSite: "strict",
      });

      // Clear all queries from react-query
      queryClient.clear();

      // Reset axios default headers
      delete api.defaults.headers.common["Authorization"];

      // Clear user store state (this will also clear the persisted state)
      // Note: We can't import useUser here due to circular dependency
      // The user store will be cleared when the component re-renders
      // or we can dispatch a custom event to clear it
      window.dispatchEvent(new CustomEvent("clear-user-store"));

      // Show toast notification
      toast.error(message, {
        duration: 5000,
        richColors: true,
      });

      // Reset refresh state
      isRefreshing = false;
      failedQueue = [];

      // Redirect to login page if not already there
      const currentPath = window.location.pathname;
      const publicRoutes = ["/login", "/register", "/"];

      if (!publicRoutes.includes(currentPath)) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Force redirect even if there's an error
      window.location.href = "/login";
    }
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token && originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("REFRESH_TOKEN");

      // If no refresh token exists, logout immediately
      if (!refreshToken) {
        isRefreshing = false;
        await handleLogout("No refresh token found. Please login again.");
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_PUBLIC_API_BASE_URL}/web/refresh`,
          {
            refreshToken,
          }
        );

        if (data.accessToken) {
          localStorage.setItem("SMX_USER_TOKEN", data.accessToken);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.accessToken}`;
          processQueue(null, data.accessToken);

          return api(originalRequest);
        } else {
          throw new Error("No access token received");
        }
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);

        // Handle logout on refresh token failure
        await handleLogout("Token refresh failed. Please login again.");

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other error status codes
    if (error.response?.status === 403) {
      await handleLogout("Access denied. Please login again.");
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = isBrowser ? localStorage.getItem("SMX_USER_TOKEN") : null;
  if (token) {
    if (config.headers) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
  }
  return config;
});

export default api;
