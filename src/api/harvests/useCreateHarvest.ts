import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../useApi";

export interface HarvestCreate {
  kilograms: number;
  employeeId: string;
  berryTypeId: string;
  berryKindId: string | null;
}

export const useCreateHarvest = () => {
  const apiClient = useApiClient();
  return useMutation<string, Error, HarvestCreate>({
    mutationFn: async (sale: HarvestCreate) => {
      const { data } = await apiClient.post<string>("/Harvest/Create", sale);
      return data;
    },
  });
};
