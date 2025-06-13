import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../useApi";

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
  const apiClient = useApiClient();
  return useMutation<string, Error, BulkSaleCreate[]>({
    mutationFn: async (sales: BulkSaleCreate[]) => {
      const { data } = await apiClient.post<string>("/Sale/CreateBulk", {
        sales: sales,
      });
      return data;
    },
  });
};
