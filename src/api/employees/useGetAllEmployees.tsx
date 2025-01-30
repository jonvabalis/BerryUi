import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { EmployeeData } from "./useGetByIdEmployee";

export const useGetAllEmployees = () => {
  return useQuery<EmployeeData[], Error>({
    queryKey: ["getAllEmployees"],
    queryFn: async () => {
      const { data } = await axios.get<EmployeeData[]>(
        `${import.meta.env.VITE_BASE_URL}/Employee/GetAll`
      );
      return data;
    },
  });
};
