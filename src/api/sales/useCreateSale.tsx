import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface SaleCreate {
  kilograms: number;
  pricePerKilo: number;
  totalPrice: number;
  employeeId: string;
  saleType: number;
  berryTypeId: string;
  berryKindId: string | null;
}

export const useCreateSale = () => {
  return useMutation<string, Error, SaleCreate>({
    mutationFn: async (sale: SaleCreate) => {
      const { data } = await axios.post<string>(
        `${import.meta.env.VITE_BASE_URL}/Sale/Create`,
        sale
      );
      return data;
    },
  });
};
