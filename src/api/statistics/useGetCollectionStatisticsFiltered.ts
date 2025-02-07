import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CollectionStatisticsDto } from "../../apiInterfaces/statistics/CollectionStatisticsDto";

export const useGetCollectionStatisticsFiltered = (
  berryTypeId: string,
  year?: string,
  month?: string
) => {
  return useQuery<CollectionStatisticsDto, Error>({
    queryKey: ["getCollectionStatisticsFiltered", berryTypeId, year, month],
    queryFn: async () => {
      const { data } = await axios.get<CollectionStatisticsDto>(
        `${
          import.meta.env.VITE_BASE_URL
        }/Statistics/GetCollectionStatisticsFiltered`,
        {
          params: { BerryTypeId: berryTypeId, Year: year, Month: month },
        }
      );
      return data;
    },
    enabled: (!!year || !!month) && !!berryTypeId,
  });
};
