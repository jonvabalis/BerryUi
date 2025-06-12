import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Dayjs } from "dayjs";
import { BaseTableDataLine } from "../../apiInterfaces/historyData/BaseTableDataLine";

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
  return useQuery<SaleDataLine[]>({
    queryKey: ["getByDateSales", saleDate?.format("YYYY-MM-DD")],
    queryFn: async () => {
      const { data } = await axios.get<SaleDataLine[]>(
        `${import.meta.env.VITE_BASE_URL}/Sale/GetByDate`,
        {
          params: {
            BerryTypeId: berryTypeId,
            SaleDate: saleDate?.format("YYYY-MM-DD"),
          },
        }
      );
      return data;
    },
    enabled: !!berryTypeId && !!saleDate,
    refetchOnWindowFocus: false,
  });
}
