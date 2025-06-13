import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../useApi";

export interface CostCreate {
  price: number;
}

export const useCreateCost = () => {
  const apiClient = useApiClient();
  return useMutation<string, Error, CostCreate>({
    mutationFn: async (cost: CostCreate) => {
      const { data } = await apiClient.post<string>("/Cost/Create", cost);
      return data;
    },
  });
};
