import { useQuery } from "@tanstack/react-query";
import { CostStatisticsDto } from "../../apiInterfaces/statistics/CostStatisticsDto";
import { useApiClient } from "../useApi";

export const useGetCostsStatisticsAllTime = () => {
  const apiClient = useApiClient();
  return useQuery<CostStatisticsDto, Error>({
    queryKey: ["getCostsStatisticsAllTime"],
    queryFn: async () => {
      const { data } = await apiClient.get<CostStatisticsDto>(
        "/Statistics/GetCostsStatisticsAllTime"
      );
      return data;
    },
    enabled: false,
  });
};
