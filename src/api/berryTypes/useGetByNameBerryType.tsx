import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BerryType } from "../../components/Themes/BerryData";

export const useGetByNameBerryType = (
  berryType: string,
  options: { enabled: boolean }
) => {
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
    enabled: options.enabled,
  });
};
