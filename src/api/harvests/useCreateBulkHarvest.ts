import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface BulkHarvestCreate {
  kilograms: number;
  employeeId: string;
  berryTypeId: string;
  berryKindId: string | null;
  eventTime: Date;
}

export const useCreateBulkHarvest = () => {
  return useMutation<string, Error, BulkHarvestCreate[]>({
    mutationFn: async (harvests: BulkHarvestCreate[]) => {
      const { data } = await axios.post<string>(
        `${import.meta.env.VITE_BASE_URL}/Harvest/CreateBulk`,
        { harvests: harvests }
      );
      return data;
    },
  });
};
