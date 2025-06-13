import { useQuery } from "@tanstack/react-query";
import { BerryType } from "../../components/Themes/BerryData";
import { useApiClient } from "../useApi";

export const useGetAllBerryType = () => {
  const apiClient = useApiClient();
  return useQuery<BerryType[], Error>({
    queryKey: ["getAllBerryType"],
    queryFn: async () => {
      const { data } = await apiClient.get<BerryType[]>("/BerryType/GetAll");

      return data;
    },
    staleTime: Infinity,
  });
};
