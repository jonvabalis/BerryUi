import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { HarvestDataLine } from "./useGetByDateHarvest";
import { Dayjs } from "dayjs";

export default function useUpdateHarvest(dateForRefetch: Dayjs) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (harvest: HarvestDataLine) => {
      const { data } = await axios.put<boolean>(
        `${import.meta.env.VITE_BASE_URL}/Harvest/Update`,
        harvest
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
