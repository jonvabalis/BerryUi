import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../useApi";
import qs from "qs";

export interface ComparisonEntry {
  time: string;
  [timeEntry: string]: string;
}

export interface CompareByYearStatisticsDto {
  harvestKilograms: ComparisonEntry[];
  saleKilograms: ComparisonEntry[];
  saleRevenue: ComparisonEntry[];
}

export const useGetCompareByYearStatistics = (
  berryTypeId: string,
  yearData: number[]
) => {
  const apiClient = useApiClient();
  return useQuery<CompareByYearStatisticsDto, Error>({
    queryKey: ["getCompareByYearStatistics", berryTypeId, yearData],
    queryFn: async () => {
      const { data } = await apiClient.get<CompareByYearStatisticsDto>(
        "/Statistics/GetCompareByYearStatistics",
        {
          params: { BerryTypeId: berryTypeId, Years: yearData },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: "repeat" });
          },
        }
      );
      console.log(yearData);
      return data;
    },
    enabled: false,
  });
};
