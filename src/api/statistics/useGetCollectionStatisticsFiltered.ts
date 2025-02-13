import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CollectionStatisticsDto } from "../../apiInterfaces/statistics/CollectionStatisticsDto";

export const useGetCollectionStatisticsFiltered = (
  berryTypeId: string,
  year?: number,
  month?: number
) => {
  return useQuery<CollectionStatisticsDto, Error>({
    queryKey: ["getCollectionStatisticsFiltered", berryTypeId, year, month],
    queryFn: async () => {
      if (!year && !month) {
        throw new Error(
          "At least one of either year or month has to be provided"
        );
      }
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
    enabled: false,
  });
};
