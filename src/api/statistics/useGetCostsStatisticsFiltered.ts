import { useQuery } from "@tanstack/react-query";
import { CostStatisticsDto } from "../../apiInterfaces/statistics/CostStatisticsDto";
import { useApiClient } from "../useApi";

export const useGetCostsStatisticsFiltered = (
  year?: number,
  month?: number
) => {
  const apiClient = useApiClient();
  return useQuery<CostStatisticsDto, Error>({
    queryKey: ["getCostsStatisticsFiltered", year, month],
    queryFn: async () => {
      if (!year && !month) {
        throw new Error(
          "At least one of either year or month has to be provided"
        );
      }
      const { data } = await apiClient.get<CostStatisticsDto>(
        "/Statistics/GetCostsStatisticsFiltered",
        {
          params: { Year: year, Month: month },
        }
      );
      return data;
    },
    enabled: false,
  });
};
