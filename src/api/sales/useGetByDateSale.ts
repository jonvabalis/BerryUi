import { useQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import { BaseTableDataLine } from "../../apiInterfaces/historyData/BaseTableDataLine";
import { useApiClient } from "../useApi";

export interface SaleDataLine extends BaseTableDataLine {
  pricePerKilo: number;
  totalPrice: number;
  saleId: string;
  saleType: string | number;
}

export default function useGetByDateSales(
  berryTypeId: string | undefined,
  saleDate: Dayjs | undefined
) {
  const apiClient = useApiClient();
  return useQuery<SaleDataLine[]>({
    queryKey: ["getByDateSales", saleDate?.format("YYYY-MM-DD")],
    queryFn: async () => {
      const { data } = await apiClient.get<SaleDataLine[]>("/Sale/GetByDate", {
        params: {
          BerryTypeId: berryTypeId,
          SaleDate: saleDate?.format("YYYY-MM-DD"),
        },
      });
      return data;
    },
    enabled: !!berryTypeId && !!saleDate,
    refetchOnWindowFocus: false,
  });
}
