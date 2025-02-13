import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CollectionStatisticsDto } from "../../apiInterfaces/statistics/CollectionStatisticsDto";

export const useGetCollectionStatisticsAllTime = (berryTypeId: string) => {
  return useQuery<CollectionStatisticsDto, Error>({
    queryKey: ["getCollectionStatisticsAllTime", berryTypeId],
    queryFn: async () => {
      const { data } = await axios.get<CollectionStatisticsDto>(
        `${
          import.meta.env.VITE_BASE_URL
        }/Statistics/GetCollectionStatisticsAllTime`,
        {
          params: { BerryTypeId: berryTypeId },
        }
      );
      return data;
    },
    enabled: false,
  });
};
