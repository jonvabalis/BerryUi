import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface BerryKindCreate {
  kind: string;
  berryTypeId: string;
}

export const useCreateBerryKind = () => {
  return useMutation<string, Error, BerryKindCreate>({
    mutationFn: async (berryKind: BerryKindCreate) => {
      const { data } = await axios.post<string>(
        `${import.meta.env.VITE_BASE_URL}/BerryKind/Create`,
        berryKind
      );
      return data;
    },
  });
};
