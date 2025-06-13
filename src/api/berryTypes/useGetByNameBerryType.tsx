import { useQuery } from "@tanstack/react-query";
import { BerryType } from "../../components/Themes/BerryData";
import { useApiClient } from "../useApi";

export const useGetByNameBerryType = (
  berryType: string,
  options: { enabled: boolean }
) => {
  const apiClient = useApiClient();
  return useQuery<BerryType, Error>({
    queryKey: ["getByNameBerryType", berryType],
    queryFn: async () => {
      const { data } = await apiClient.get<BerryType>("/BerryType/GetByName", {
        params: { BerryType: berryType },
      });

      return data;
    },
    enabled: options.enabled,
  });
};
