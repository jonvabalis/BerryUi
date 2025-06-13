import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../useApi";

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
  const apiClient = useApiClient();
  return useMutation<string, Error, SaleCreate>({
    mutationFn: async (sale: SaleCreate) => {
      const { data } = await apiClient.post<string>("/Sale/Create", sale);
      return data;
    },
  });
};
