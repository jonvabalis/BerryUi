import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface EmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthday: Date;
  id: string;
  createdAt: Date;
  lastModifiedAt: Date;
}

export const useGetByIdEmployee = (employeeId: string) => {
  return useQuery<EmployeeData, Error>({
    queryKey: ["getByIdEmployee", employeeId],
    queryFn: async () => {
      const { data } = await axios.get<EmployeeData>(
        `${import.meta.env.VITE_BASE_URL}/Employee/Get`,
        {
          params: { EmployeeId: employeeId },
        }
      );
      return data;
    },
  });
};
