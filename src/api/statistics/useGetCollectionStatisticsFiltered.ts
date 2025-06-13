import { useQuery } from "@tanstack/react-query";
import { CollectionStatisticsDto } from "../../apiInterfaces/statistics/CollectionStatisticsDto";
import { useApiClient } from "../useApi";

export const useGetCollectionStatisticsFiltered = (
  berryTypeId: string,
  year?: number,
  month?: number
) => {
  const apiClient = useApiClient();
  return useQuery<CollectionStatisticsDto, Error>({
    queryKey: ["getCollectionStatisticsFiltered", berryTypeId, year, month],
    queryFn: async () => {
      if (!year && !month) {
        throw new Error(
          "At least one of either year or month has to be provided"
        );
      }
      const { data } = await apiClient.get<CollectionStatisticsDto>(
        "/Statistics/GetCollectionStatisticsFiltered",
        {
          params: { BerryTypeId: berryTypeId, Year: year, Month: month },
        }
      );
      return data;
    },
    enabled: false,
  });
};
