import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../useApi";

export interface EmployeeRegister {
  firstName: string;
  lastName: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export const useRegisterEmployee = () => {
  const apiClient = useApiClient();
  return useMutation<string, Error, EmployeeRegister>({
    mutationFn: async (employeeData: EmployeeRegister) => {
      const { data } = await apiClient.post<string>(
        "/Employee/Create",
        employeeData
      );
      return data;
    },
  });
};
