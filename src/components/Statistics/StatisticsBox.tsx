import { Radio, RadioGroup, Typography } from "@mui/material";
import { useState } from "react";
import { useToast } from "../../hooks/useToast";
import StatisticsControlLabel from "./StatisticsControlLabel";
import { StatisticsSelectField } from "./StatisticsSelectField";
import { YEAR_SELECT_DATA, MONTH_SELECT_DATA } from "./StatisticsData";
import { GetButton } from "./GetButton";
import { useGetCollectionStatisticsFiltered } from "../../api/statistics/useGetCollectionStatisticsFiltered";
import { useGetCollectionStatisticsAllTime } from "../../api/statistics/useGetCollectionStatisticsAllTime";
import { useGetCostsStatisticsAllTime } from "../../api/statistics/useGetCostsStatisticsAllTime";
import { CostStatisticsDto } from "../../apiInterfaces/statistics/CostStatisticsDto";
import { CollectionStatisticsDto } from "../../apiInterfaces/statistics/CollectionStatisticsDto";
import StatisticsTable from "./StatisticsTable";
import { useGetCostsStatisticsFiltered } from "../../api/statistics/useGetCostsStatisticsFiltered";
import { BerryType } from "../../api/berryTypes/useGetByNameBerryType";
import { GridContainer } from "../Reusable/GridContainer";

interface StatisticsBoxProps {
  berryTypeData: BerryType;
}

export default function StatisticsBox({
  berryTypeData: berryTypeData,
}: StatisticsBoxProps) {
  const toast = useToast();

  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);

  const useGetCollectionStatisticsAllTimeQuery =
    useGetCollectionStatisticsAllTime(berryTypeData.id);
  const useGetCostsStatisticsAllTimeQuery = useGetCostsStatisticsAllTime();
  const useGetCollectionStatisticsFilteredQuery =
    useGetCollectionStatisticsFiltered(
      berryTypeData.id,
      year == 0 ? undefined : year,
      month == 0 ? undefined : month
    );
  const useGetCostsStatisticsFilteredQuery = useGetCostsStatisticsFiltered(
    year == 0 ? undefined : year,
    month == 0 ? undefined : month
  );

  const [collectionTableData, setCollectionTableData] = useState<
    CollectionStatisticsDto | undefined
  >();
  const [costTableData, setCostTableData] = useState<
    CostStatisticsDto | undefined
  >();

  const [radioValue, setRadioValue] = useState<string>("alltime");
  const [headerType, setHeaderType] = useState<string>("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
  };

  const handleHeaderTypeChange = () => {
    setHeaderType(
      radioValue == "alltime" || (year == 0 && month != 0)
        ? "Year"
        : radioValue != "alltime" && year != 0 && month != 0
        ? "Day"
        : "Month"
    );
  };

  return (
    <>
      <GridContainer span={3}>
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
      </GridContainer>
      <GridContainer span={3}>
        <Typography color="primary.contrastText">Select year:</Typography>
        <StatisticsSelectField
          data={YEAR_SELECT_DATA}
          value={year}
          setState={setYear}
          label={"Year"}
          radioValue={radioValue}
        />
      </GridContainer>
      <GridContainer span={3}>
        <Typography color="primary.contrastText">Select month:</Typography>
        <StatisticsSelectField
          data={MONTH_SELECT_DATA}
          value={month}
          setState={setMonth}
          label={"Month"}
          radioValue={radioValue}
        />
      </GridContainer>
      <GridContainer span={3}>
        <GetButton
          firstQuery={
            radioValue == "alltime"
              ? useGetCollectionStatisticsAllTimeQuery
              : useGetCollectionStatisticsFilteredQuery
          }
          secondQuery={
            radioValue == "alltime"
              ? useGetCostsStatisticsAllTimeQuery
              : useGetCostsStatisticsFilteredQuery
          }
          handleHeaderTypeChange={handleHeaderTypeChange}
          onSuccess={(data) => {
            setCollectionTableData(data.firstResultData);
            setCostTableData(data.secondResultData);
          }}
          onError={(error) => {
            toast.error(error.message);
          }}
        />
      </GridContainer>
      <GridContainer span={6}>
        <StatisticsTable
          data={collectionTableData}
          header={[
            headerType,
            "Kilograms harvested",
            "Kilograms sold",
            "Sold for",
          ]}
        />
      </GridContainer>
      <GridContainer span={6}>
        <StatisticsTable data={costTableData} header={[headerType, "Costs"]} />
      </GridContainer>
    </>
  );
}
