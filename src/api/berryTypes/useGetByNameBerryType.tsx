import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface BerryType {
  type: string;
  berryKinds: string[] | null;
  id: string;
  createdAt: Date;
  lastModifiedAt: Date;
}

export const useGetByNameBerryType = (berryType: string) => {
  return useQuery<BerryType, Error>({
    queryKey: ["getByNameBerryType", berryType],
    queryFn: async () => {
      const { data } = await axios.get<BerryType>(
        `${import.meta.env.VITE_BASE_URL}/BerryType/GetByName`,
        {
          params: { BerryType: berryType },
        }
      );
      return data;
    },
  });
};
