import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface BerryKind {
  kind: string;
  berryTypeId: string;
  berryType?: string[] | null;
  id: string;
  createdAt: Date;
  lastModifiedAt: Date;
}

export const useGetAllByTypeBerryKind = (berryTypeId: string) => {
  return useQuery<BerryKind[], Error>({
    queryKey: ["getAllBerryKind", berryTypeId],
    queryFn: async () => {
      const { data } = await axios.get<BerryKind[]>(
        `${import.meta.env.VITE_BASE_URL}/BerryKind/GetAll`,
        {
          params: { BerryTypeId: berryTypeId },
        }
      );
      return data;
    },
  });
};
