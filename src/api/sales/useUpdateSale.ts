import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import { SaleDataLine } from "./useGetByDateSale";
import { useApiClient } from "../useApi";

export default function useUpdateSale(dateForRefetch: Dayjs) {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sale: SaleDataLine) => {
      const { data } = await apiClient.put<boolean>("/Sale/Update", sale);
      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["getByDateSales", dateForRefetch.format("YYYY-MM-DD")],
      });
      //queryClient.invalidateQueries({ queryKey: ["getAllRecordedDaysByYear"] });
      queryClient.invalidateQueries({
        queryKey: ["getBriefByDay", dateForRefetch.format("YYYY-MM-DD")],
      });
    },
  });
}
