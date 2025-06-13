import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HarvestDataLine } from "./useGetByDateHarvest";
import { Dayjs } from "dayjs";
import { useApiClient } from "../useApi";

export default function useUpdateHarvest(dateForRefetch: Dayjs) {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (harvest: HarvestDataLine) => {
      const { data } = await apiClient.put<boolean>("/Harvest/Update", harvest);
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
