import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../useApi";

export interface BerryKind {
  kind: string;
  berryTypeId: string;
  berryType?: string[] | null;
  id: string;
  createdAt: Date;
  lastModifiedAt: Date;
}

export const useGetAllByTypeBerryKind = (
  berryTypeId: string,
  options?: { enabled: boolean }
) => {
  const apiClient = useApiClient();
  return useQuery<BerryKind[], Error>({
    queryKey: ["getAllBerryKind", berryTypeId],
    queryFn: async () => {
      const { data } = await apiClient.get<BerryKind[]>("/BerryKind/GetAll", {
        params: { BerryTypeId: berryTypeId },
      });
      return data;
    },
    enabled: options ? options.enabled : true,
  });
};
