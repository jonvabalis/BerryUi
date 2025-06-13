import { useQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import { BaseTableDataLine } from "../../apiInterfaces/historyData/BaseTableDataLine";
import { useApiClient } from "../useApi";

export interface HarvestDataLine extends BaseTableDataLine {
  harvestId: string;
}

export default function useGetByDateHarvests(
  berryTypeId: string | undefined,
  harvestDate: Dayjs | undefined
) {
  const apiClient = useApiClient();
  return useQuery<HarvestDataLine[]>({
    queryKey: ["getByDateHarvests", harvestDate?.format("YYYY-MM-DD")],
    queryFn: async () => {
      const { data } = await apiClient.get<HarvestDataLine[]>(
        "/Harvest/GetByDate",
        {
          params: {
            BerryTypeId: berryTypeId,
            HarvestDate: harvestDate?.format("YYYY-MM-DD"),
          },
        }
      );
      return data;
    },
    enabled: !!berryTypeId && !!harvestDate,
    refetchOnWindowFocus: false,
  });
}
