import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../useApi";

export interface BulkHarvestCreate {
  kilograms: number;
  employeeId: string;
  berryTypeId: string;
  berryKindId: string | null;
  eventTime: Date;
}

export const useCreateBulkHarvest = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<string, Error, BulkHarvestCreate[]>({
    mutationFn: async (harvests: BulkHarvestCreate[]) => {
      const { data } = await apiClient.post<string>("/Harvest/CreateBulk", {
        harvests: harvests,
      });
      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getByDateHarvests"] });
    },
  });
};
