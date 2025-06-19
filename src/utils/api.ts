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
    clearStorage(); // Clear storage

    // Remove auth cookie
    Cookies.remove("auth-token", {
      secure: import.meta.env.MODE === "production",
      sameSite: "strict",
    });

    // Show toast notification
    toast.error(message, {
      duration: 5000,
      richColors: true,
    });

    // Clear all queries from react-query
    queryClient.clear();

    // If we're not already on the login page, redirect to shop
    if (window.location.pathname !== "/register") {
      window.location.href = "/register";
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
        // await handleLogout();
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_PUBLIC_API_BASE_URL}/web/refresh`,
          {
            refreshToken,
          }
        );

        localStorage.setItem("QUX_USER_TOKEN", data.accessToken);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        processQueue(null, data.accessToken);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);

        // Handle logout on refresh token failure
        await handleLogout();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = isBrowser ? localStorage.getItem("QUX_USER_TOKEN") : null;
  if (token) {
    if (config.headers) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
  }
  return config;
});

export default api;
