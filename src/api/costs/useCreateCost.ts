import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface CostCreate {
  price: number;
}

export const useCreateCost = () => {
  return useMutation<string, Error, CostCreate>({
    mutationFn: async (cost: CostCreate) => {
      const { data } = await axios.post<string>(
        `${import.meta.env.VITE_BASE_URL}/Cost/Create`,
        cost
      );
      return data;
    },
  });
};
