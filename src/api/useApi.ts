import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ApiError {
  errors: {
    message: string;
  }[];
}

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const errorData = error.response?.data as ApiError | undefined;
    let errorMessage = `Something went wrong: ${error.message}`;

    if (error.response?.status === 401) {
      // accessToken expired
      localStorage.removeItem("accessToken");
      localStorage.removeItem("employeeId");
      window.location.href = "/login";
      toast.error("Please login again");

      return Promise.reject(error);
    }

    if (
      errorData?.errors &&
      Array.isArray(errorData.errors) &&
      errorData.errors.length > 0
    ) {
      errorMessage = errorData.errors.map((e) => e.message).join("\n");
    }

    toast.error(errorMessage);

    return Promise.reject(error);
  }
);

export const useApiClient = () => {
  return api;
};
