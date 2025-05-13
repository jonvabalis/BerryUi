import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllRecordedDaysByYear = (year: number) => {
  return useQuery<string[], Error>({
    queryKey: ["getAllRecordedDaysByYear", year],
    queryFn: async () => {
      const { data } = await axios.get<string[]>(
        `${import.meta.env.VITE_BASE_URL}/History/GetAllRecordedDaysByYear`,
        {
          params: { year: year },
        }
      );
      return data;
    },
  });
};
