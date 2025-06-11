import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dayjs } from "dayjs";
import { SaleDataLine } from "./useGetByDateSale";

export default function useUpdateSale(dateForRefetch: Dayjs) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sale: SaleDataLine) => {
      const { data } = await axios.put<boolean>(
        `${import.meta.env.VITE_BASE_URL}/Sale/Update`,
        sale
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
