import { Box, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { MONTH_SELECT_DATA, YearSelect } from "./StatisticsData";
import { GetButton } from "./GetButton";
import { BoxPaper } from "../Reusable/BoxPaper";
import { BerryType } from "../Themes/BerryData";
import React from "react";
import {
  CompareByYearStatisticsDto,
  useGetCompareByYearStatistics,
} from "../../api/statistics/useGetCompareByYearStatistics";
import DisplayMultipleLineChart from "./Charts/DisplayMultipleLineChart";
import StatisticFilterSelectForm from "./StatisticFilterSelectForm";
import { StatisticsSelectField } from "./StatisticsSelectField";

interface CompareSeasonsBoxProps {
  berryTypeData: BerryType;
  yearSelectValues: YearSelect[];
}

export default function CompareSeasonsBox({
  berryTypeData,
  yearSelectValues,
}: CompareSeasonsBoxProps) {
  const [years, setYears] = React.useState<number[]>([]);
  const [startMonth, setStartMonth] = React.useState<number>(1);
  const [endMonth, setEndMonth] = React.useState<number>(12);
  const [headerYears, setHeaderYears] = useState<string>("");
  const [chartData, setChartData] = useState<CompareByYearStatisticsDto>();

  const useGetCompareByYearStatisticsQuery = useGetCompareByYearStatistics(
    berryTypeData.id,
    years,
    startMonth,
    endMonth
  );

  const handleYearChange = (event: SelectChangeEvent<typeof years>) => {
    const value = event.target.value;

    const stringValues = typeof value === "string" ? value.split(",") : value;
    const numberValues = stringValues
      .map((item) => Number(item))
      .sort((a, b) => a - b);

    setYears(numberValues);
  };

  const handleHeaderTypeChange = () => {
    setHeaderYears(years.join(", "));
  };

  return (
    <>
      <BoxPaper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <StatisticFilterSelectForm
              inputLabel="Year"
              selectedValues={years}
              handleChange={handleYearChange}
              availableValues={yearSelectValues}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                width: 300,
              }}
            >
              <Box sx={{ display: "flex", width: "100%" }}>
                <StatisticsSelectField
                  data={MONTH_SELECT_DATA}
                  value={startMonth}
                  setState={setStartMonth}
                  label={"Start month"}
                  selectAllValues={false}
                />
              </Box>

              <Box sx={{ display: "flex", width: "100%" }}>
                <StatisticsSelectField
                  data={MONTH_SELECT_DATA}
                  value={endMonth}
                  setState={setEndMonth}
                  label={"End month"}
                  selectAllValues={false}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ minWidth: 300 }}>
            <GetButton
              firstQuery={useGetCompareByYearStatisticsQuery}
              handleHeaderTypeChange={handleHeaderTypeChange}
              onSuccess={(data) => {
                setChartData(data.firstResultData);
              }}
            />
          </Box>
        </Box>
      </BoxPaper>

      {chartData && (
        <>
          <Box sx={{ mt: 4 }} />
          <BoxPaper>
            <DisplayMultipleLineChart
              chartName={`Harvest comparison in ${headerYears}`}
              chartData={chartData?.harvestKilograms}
              xAxisLabel={"Days"}
              yAxisLabel="kg"
              years={years}
            />
          </BoxPaper>
          <Box sx={{ mt: 4 }} />
          <BoxPaper>
            <DisplayMultipleLineChart
              chartName={`Sale comparison in ${headerYears}`}
              chartData={chartData?.saleKilograms}
              xAxisLabel={"Days"}
              yAxisLabel="kg"
              years={years}
            />
          </BoxPaper>
          <Box sx={{ mt: 4 }} />
          <BoxPaper>
            <DisplayMultipleLineChart
              chartName={`Revenue comparison in ${headerYears}`}
              chartData={chartData?.saleRevenue}
              xAxisLabel={"Days"}
              yAxisLabel="eur"
              years={years}
            />
          </BoxPaper>
        </>
      )}
    </>
  );
}
