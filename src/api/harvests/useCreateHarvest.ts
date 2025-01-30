import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface HarvestCreate {
  kilograms: number;
  employeeId: string;
  berryTypeId: string;
  berryKindId: string | null;
}

export const useCreateHarvest = () => {
  return useMutation<string, Error, HarvestCreate>({
    mutationFn: async (sale: HarvestCreate) => {
      const { data } = await axios.post<string>(
        `${import.meta.env.VITE_BASE_URL}/Harvest/Create`,
        sale
      );
      return data;
    },
  });
};
