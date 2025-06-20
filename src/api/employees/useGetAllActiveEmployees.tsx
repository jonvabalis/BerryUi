import { useQuery } from "@tanstack/react-query";
import { EmployeeData } from "./useGetByIdEmployee";
import { useApiClient } from "../useApi";

export const useGetAllActiveEmployees = () => {
  const apiClient = useApiClient();
  return useQuery<EmployeeData[], Error>({
    queryKey: ["getAllActiveEmployees"],
    queryFn: async () => {
      const { data } = await apiClient.get<EmployeeData[]>(
        "/Employee/GetAllActive",
        {
          params: { IsActive: true },
        }
      );
      return data;
    },
  });
};
