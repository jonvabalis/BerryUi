import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Dayjs } from "dayjs";

export interface HarvestDataLine {
  kilograms: number;
  harvestId: string;
  employeeId: string;
  berryKindId: string;
  eventTime: Date;
}

export default function useGetByDateHarvests(
  berryTypeId: string | undefined,
  harvestDate: Dayjs | undefined
) {
  return useQuery<HarvestDataLine[]>({
    queryKey: ["getByDateHarvests", harvestDate?.format("YYYY-MM-DD")],
    queryFn: async () => {
      const { data } = await axios.get<HarvestDataLine[]>(
        `${import.meta.env.VITE_BASE_URL}/Harvest/GetByDate`,
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
