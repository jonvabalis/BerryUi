import Box from "@mui/material/Box";
import PageHeader from "../components/Employee/PageHeader";
import {
  BerryType,
  useGetByNameBerryType,
} from "../api/berryTypes/useGetByNameBerryType";
import StatisticsBox from "../components/Statistics/StatisticsBox";

export default function statistics() {
  const savedBerryType = localStorage.getItem("berryType");
  const berryTypeName = savedBerryType
    ? (JSON.parse(savedBerryType) as BerryType).type
    : "not found";
  const { data: berryTypeData, isLoading } =
    useGetByNameBerryType(berryTypeName);

  if (isLoading) {
    return <PageHeader text="Data is being fetched" />;
  }

  if (!berryTypeData) {
    return <PageHeader text="No data is available" />;
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="100px"
      gap={2}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="flex-start"
        gridColumn="span 12"
      >
        <PageHeader text="Statistics" />
      </Box>
      <StatisticsBox />
    </Box>
  );
}
