import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Data {
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
  return useQuery<Data, Error>({
    queryKey: ["getByIdEmployee", employeeId],
    queryFn: async () => {
      const { data } = await axios.get<Data>(
        `${import.meta.env.VITE_BASE_URL}/Employee/Get`,
        {
          params: { EmployeeId: employeeId },
        }
      );
      return data;
    },
  });
};
