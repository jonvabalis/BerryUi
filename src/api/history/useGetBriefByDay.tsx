import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface BriefByDay {
  harvestedCount: number;
  soldCount: number;
  soldSum: number;
}

export const useGetBriefByDay = (date: string) => {
  return useQuery<BriefByDay, Error>({
    queryKey: ["getBriefByDay", date],
    queryFn: async () => {
      const { data } = await axios.get<BriefByDay>(
        `${import.meta.env.VITE_BASE_URL}/History/GetBriefByDay`,
        {
          params: { date: date },
        }
      );
      return data;
    },
  });
};
