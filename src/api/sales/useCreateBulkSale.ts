import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface BulkSaleCreate {
  kilograms: number;
  pricePerKilo: string;
  totalPrice: string;
  employeeId: string;
  saleType: number;
  berryTypeId: string;
  berryKindId: string | null;
  eventTime: Date;
}

export const useCreateBulkSale = () => {
  return useMutation<string, Error, BulkSaleCreate[]>({
    mutationFn: async (sales: BulkSaleCreate[]) => {
      const { data } = await axios.post<string>(
        `${import.meta.env.VITE_BASE_URL}/Sale/CreateBulk`,
        { sales: sales }
      );
      return data;
    },
  });
};
