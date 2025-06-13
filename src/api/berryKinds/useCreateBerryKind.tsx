import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../useApi";

export interface BerryKindCreate {
  kind: string;
  berryTypeId: string;
}

export const useCreateBerryKind = () => {
  const apiClient = useApiClient();
  return useMutation<string, Error, BerryKindCreate>({
    mutationFn: async (berryKind: BerryKindCreate) => {
      const { data } = await apiClient.post<string>(
        "/BerryKind/Create",
        berryKind
      );
      return data;
    },
  });
};
