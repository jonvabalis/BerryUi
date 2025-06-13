import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import { useApiClient } from "../useApi";

export default function useDeleteSale(dateForRefetch: Dayjs) {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: async (saleId: string) => {
      const { data } = await apiClient.delete<boolean>(
        `/Sale/Delete/${saleId}`
      );
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
