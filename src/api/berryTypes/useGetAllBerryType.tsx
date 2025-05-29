import { useQuery } from "@tanstack/react-query";
import { BerryType } from "../../components/Themes/BerryData";
import axios from "axios";

export const useGetAllBerryType = () => {
  return useQuery<BerryType[], Error>({
    queryKey: ["getAllBerryType"],
    queryFn: async () => {
      const { data } = await axios.get<BerryType[]>(
        `${import.meta.env.VITE_BASE_URL}/BerryType/GetAll`
      );

      return data;
    },
    staleTime: Infinity,
  });
};
