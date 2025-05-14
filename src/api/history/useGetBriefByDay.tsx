import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface HistoryEmployeeBriefByDay {
  name: string;
  harvestedCount: number;
  soldCount: number;
}

export interface HistoryTotalBriefByDay {
  harvestedCount: number;
  soldCount: number;
  soldSum: number;
}

export interface HistoryBriefByDay {
  employees: Record<string, HistoryEmployeeBriefByDay>;
  totals: HistoryTotalBriefByDay;
}

export const useGetBriefByDay = (date: string) => {
  return useQuery<HistoryBriefByDay, Error>({
    queryKey: ["getBriefByDay", date],
    queryFn: async () => {
      const { data } = await axios.get<HistoryBriefByDay>(
        `${import.meta.env.VITE_BASE_URL}/History/GetBriefByDay`,
        {
          params: { date: date },
        }
      );
      return data;
    },
  });
};
