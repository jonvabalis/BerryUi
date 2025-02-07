import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CostStatisticsDto } from "../../apiInterfaces/statistics/CostStatisticsDto";

export const useGetCostsStatisticsAllTime = () => {
  return useQuery<CostStatisticsDto, Error>({
    queryKey: ["getCostsStatisticsAllTime"],
    queryFn: async () => {
      const { data } = await axios.get<CostStatisticsDto>(
        `${import.meta.env.VITE_BASE_URL}/Statistics/GetCostsStatisticsAllTime`
      );
      return data;
    },
  });
};
