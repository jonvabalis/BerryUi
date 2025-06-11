import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dayjs } from "dayjs";

export default function useDeleteSale(dateForRefetch: Dayjs) {
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: async (saleId: string) => {
      const { data } = await axios.delete<boolean>(
        `${import.meta.env.VITE_BASE_URL}/Sale/Delete/${saleId}`
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
