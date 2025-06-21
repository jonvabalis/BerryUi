import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useApiClient } from "../useApi";

export interface EmployeeLogin {
  email: string;
  password: string;
}

export interface EmployeeLoginResponse {
  employeeId: string;
  accessToken: string;
}

export const useLoginEmployee = () => {
  const { login } = useAuth();
  const apiClient = useApiClient();
  const navigate = useNavigate();
  return useMutation<EmployeeLoginResponse, Error, EmployeeLogin>({
    mutationFn: async (loginData: EmployeeLogin) => {
      const { data } = await apiClient.post<EmployeeLoginResponse>(
        "/Employee/Login",
        loginData
      );
      return data;
    },
    onSuccess: (data) => {
      login(data);
      toast.success("Logged in successfully");
      navigate("/");
    },
  });
};
