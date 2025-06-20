import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../useApi";

export interface EmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthday: Date;
  id: string;
  createdAt: Date;
  lastModifiedAt: Date;
  isActive: boolean;
}

export const useGetByIdEmployee = (employeeId: string) => {
  const apiClient = useApiClient();
  return useQuery<EmployeeData, Error>({
    queryKey: ["getByIdEmployee", employeeId],
    queryFn: async () => {
      const { data } = await apiClient.get<EmployeeData>("/Employee/Get", {
        params: { EmployeeId: employeeId },
      });
      return data;
    },
  });
};
