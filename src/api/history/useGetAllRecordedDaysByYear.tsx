import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../useApi";

export const useGetAllRecordedDaysByYear = (
  year: number,
  berryTypeId: string
) => {
  const apiClient = useApiClient();
  return useQuery<string[], Error>({
    queryKey: ["getAllRecordedDaysByYear", year],
    queryFn: async () => {
      const { data } = await apiClient.get<string[]>(
        "/History/GetAllRecordedDaysByYear",
        {
          params: { year: year, berryTypeId: berryTypeId },
        }
      );
      return data;
    },
  });
};
