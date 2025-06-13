import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import { useApiClient } from "../useApi";

export default function useDeleteHarvest(dateForRefetch: Dayjs) {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: async (harvestId: string) => {
      const { data } = await apiClient.delete<boolean>(
        `/Harvest/Delete/${harvestId}`
      );
      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["getByDateHarvests", dateForRefetch.format("YYYY-MM-DD")],
      });
      //queryClient.invalidateQueries({ queryKey: ["getAllRecordedDaysByYear"] });
      queryClient.invalidateQueries({
        queryKey: ["getBriefByDay", dateForRefetch.format("YYYY-MM-DD")],
      });
    },
  });
}
