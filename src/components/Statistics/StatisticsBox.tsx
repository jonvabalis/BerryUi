import Box from "@mui/material/Box";
import { Radio, RadioGroup, Typography } from "@mui/material";
import { ChangeEvent, SetStateAction, useState } from "react";
import { useToast } from "../../hooks/useToast";
import {
  HarvestCreate,
  useCreateHarvest,
} from "../../api/harvests/useCreateHarvest";
import { NumberField } from "../Sale/NumberField";
import { BerryKindSelect } from "../Sale/BerryKindSelectField";
import { CreateButton } from "../Sale/CreateButton";
import StatisticsControlLabel from "./StatisticsControlLabel";
import { StatisticsSelectField } from "./StatisticsSelectField";
import {
  YearSelect,
  MonthSelect,
  YEAR_SELECT_DATA,
  MONTH_SELECT_DATA,
} from "./StatisticsData";
import MuiTableComponent from "./CollectionStatisticsTable";
import { useGetCollectionStatisticsAllTime } from "../../api/statistics/useGetCollectionStatisticsAllTime";
import { useGetCollectionStatisticsFiltered } from "../../api/statistics/useGetCollectionStatisticsFiltered";

interface StatisticsBoxProps {}

export default function StatisticsBox({}: StatisticsBoxProps) {
  const toast = useToast();

  // const { data, isLoading } = useGetCollectionStatisticsAllTime(
  //   "67cc8b9d-0376-4726-b69d-01eb869bba2c"
  // );
  const { data, isLoading } = useGetCollectionStatisticsFiltered(
    "67cc8b9d-0376-4726-b69d-01eb869bba2c",
    "2025",
    "01"
  );

  // if (!data) {
  //   return <h1>aaaa</h1>;
  // }

  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);

  const [radioValue, setRadioValue] = useState<string>("alltime");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="flex-start"
        gridColumn="span 4"
      >
        <RadioGroup
          value={radioValue}
          onChange={handleRadioChange}
          name="use-radio-group"
          defaultValue="All-time"
        >
          <StatisticsControlLabel
            value="alltime"
            label="All-time"
            control={<Radio />}
          />
          <StatisticsControlLabel
            value="filter"
            label="Filter"
            control={<Radio />}
          />
        </RadioGroup>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="flex-start"
        gridColumn="span 4"
      >
        <Typography color="primary.contrastText">Select year:</Typography>
        <StatisticsSelectField
          data={YEAR_SELECT_DATA}
          value={year}
          setState={setYear}
          label={"Year"}
          radioValue={radioValue}
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="flex-start"
        gridColumn="span 4"
      >
        <Typography color="primary.contrastText">Select month:</Typography>
        <StatisticsSelectField
          data={MONTH_SELECT_DATA}
          value={month}
          setState={setMonth}
          label={"Month"}
          radioValue={radioValue}
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="flex-start"
        gridColumn="span 12"
      >
        <MuiTableComponent data={data} />
        {/* <CreateButton<HarvestCreate>
          data={{
            kilograms: Number(amount),
            employeeId: selectedEmployeeId,
            berryTypeId: berryTypeData.id,
            berryKindId: kind == "Mixed" ? null : kind,
          }}
          onSuccess={() => {
            toast.success("Harvest created successfully!");
          }}
          onError={(error) => {
            toast.error(error.message);
          }}
          text={"Harvest"}
          createMutation={createSaleMutation}
        ></CreateButton> */}
      </Box>
    </>
  );
}
