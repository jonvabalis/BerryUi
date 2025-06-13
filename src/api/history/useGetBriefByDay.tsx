import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../useApi";

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

export const useGetBriefByDay = (date: string, berryTypeId: string) => {
  const apiClient = useApiClient();
  return useQuery<HistoryBriefByDay, Error>({
    queryKey: ["getBriefByDay", date],
    queryFn: async () => {
      const { data } = await apiClient.get<HistoryBriefByDay>(
        "/History/GetBriefByDay",
        {
          params: { date: date, berryTypeId: berryTypeId },
        }
      );
      return data;
    },
  });
};
