import { useQuery } from "@tanstack/react-query";
import { CollectionStatisticsDto } from "../../apiInterfaces/statistics/CollectionStatisticsDto";
import { useApiClient } from "../useApi";

export const useGetCollectionStatisticsAllTime = (berryTypeId: string) => {
  const apiClient = useApiClient();
  return useQuery<CollectionStatisticsDto, Error>({
    queryKey: ["getCollectionStatisticsAllTime", berryTypeId],
    queryFn: async () => {
      const { data } = await apiClient.get<CollectionStatisticsDto>(
        "/Statistics/GetCollectionStatisticsAllTime",
        {
          params: { BerryTypeId: berryTypeId },
        }
      );
      return data;
    },
    enabled: false,
  });
};
