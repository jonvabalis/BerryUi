import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../useApi";

export const useGetYearsWithData = (berryTypeId: string) => {
  const apiClient = useApiClient();
  return useQuery<number[], Error>({
    queryKey: ["getYearsWithData", berryTypeId],
    queryFn: async () => {
      const { data } = await apiClient.get<number[]>(
        "/Statistics/GetYearsWithData",
        {
          params: { BerryTypeId: berryTypeId },
        }
      );
      return data;
    },
  });
};
