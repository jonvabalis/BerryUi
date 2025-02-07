import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CostStatisticsDto } from "../../apiInterfaces/statistics/CostStatisticsDto";

export const useGetCostsStatisticsFiltered = (
  year?: number,
  month?: number
) => {
  return useQuery<CostStatisticsDto, Error>({
    queryKey: ["getCostsStatisticsFiltered", year, month],
    queryFn: async () => {
      const { data } = await axios.get<CostStatisticsDto>(
        `${
          import.meta.env.VITE_BASE_URL
        }/Statistics/GetCostsStatisticsFiltered`,
        {
          params: { Year: year, Month: month },
        }
      );
      return data;
    },
    enabled: !!year || !!month,
  });
};
