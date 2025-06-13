import { useQuery } from "@tanstack/react-query";
import { EmployeeData } from "./useGetByIdEmployee";
import { useApiClient } from "../useApi";

export const useGetAllEmployees = () => {
  const apiClient = useApiClient();
  return useQuery<EmployeeData[], Error>({
    queryKey: ["getAllEmployees"],
    queryFn: async () => {
      const { data } = await apiClient.get<EmployeeData[]>("/Employee/GetAll");
      return data;
    },
  });
};
