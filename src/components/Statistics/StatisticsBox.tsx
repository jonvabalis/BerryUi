import {
  Box,
  Collapse,
  Grid2,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import StatisticsControlLabel from "./StatisticsControlLabel";
import { StatisticsSelectField } from "./StatisticsSelectField";
import { MONTH_SELECT_DATA, YearSelect } from "./StatisticsData";
import { GetButton } from "./GetButton";
import { useGetCollectionStatisticsFiltered } from "../../api/statistics/useGetCollectionStatisticsFiltered";
import { useGetCollectionStatisticsAllTime } from "../../api/statistics/useGetCollectionStatisticsAllTime";
import { useGetCostsStatisticsAllTime } from "../../api/statistics/useGetCostsStatisticsAllTime";
import { CostStatisticsDto } from "../../apiInterfaces/statistics/CostStatisticsDto";
import { CollectionStatisticsDto } from "../../apiInterfaces/statistics/CollectionStatisticsDto";
import StatisticsTable from "./StatisticsTable";
import { useGetCostsStatisticsFiltered } from "../../api/statistics/useGetCostsStatisticsFiltered";
import { BoxPaper } from "../Reusable/BoxPaper";
import { BerryType } from "../Themes/BerryData";
import DisplayLineChart from "./Charts/DisplaySingleLineChart";
import getChartData, {
  getChartTitle,
  HarvestSaleChartData,
} from "../../utils/chartHelper";
import ViewTablesToggle from "./ViewTablesToggle";

interface StatisticsBoxProps {
  berryTypeData: BerryType;
  yearSelectValues: YearSelect[];
}

export default function StatisticsBox({
  berryTypeData,
  yearSelectValues,
}: StatisticsBoxProps) {
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
  const [chartData, setChartData] = useState<
    HarvestSaleChartData | undefined
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

  const [isTableOpen, setIsTableOpen] = useState(false);

  const handleViewTableChange = () => {
    setIsTableOpen((prev) => !prev);
  };

  return (
    <>
      <BoxPaper>
        <Grid2 container spacing={4}>
          <Grid2
            container
            spacing={1}
            size={12}
            sx={{
              alignItems: "center",
            }}
          >
            <Grid2 size={{ xs: 12, sm: 3, md: 3 }}>
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
            </Grid2>
            <Grid2
              container
              size={{ xs: 12, sm: 9, md: 9 }}
              sx={{
                justifyContent: "space-around",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: { md: "235px", sm: "135px" },
                }}
              >
                <Typography>Select year:</Typography>
                <StatisticsSelectField
                  data={yearSelectValues}
                  value={year}
                  setState={setYear}
                  label={"Year"}
                  radioValue={radioValue}
                  selectAllValues={true}
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: { md: "235px", sm: "135px" },
                }}
              >
                <Typography>Select month:</Typography>
                <StatisticsSelectField
                  data={MONTH_SELECT_DATA}
                  value={month}
                  setState={setMonth}
                  label={"Month"}
                  radioValue={radioValue}
                  selectAllValues={true}
                />
              </Box>
            </Grid2>
          </Grid2>

          <Grid2
            container
            size={12}
            sx={{
              justifyContent: "center",
            }}
          >
            <Box
              width={"100%"}
              maxWidth={"250px"}
              sx={{ display: "flex", justifyContent: "center" }}
            >
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
                  setChartData(getChartData(data.firstResultData.data));
                }}
              />
            </Box>
          </Grid2>
        </Grid2>
      </BoxPaper>
      {collectionTableData && costTableData && (
        <>
          <Box sx={{ mt: 4 }} />
          <BoxPaper>
            <ViewTablesToggle
              handleViewTableChange={handleViewTableChange}
              isTableOpen={isTableOpen}
            />
            <Grid2
              container
              spacing={{ sm: 1, md: 4 }}
              size={12}
              sx={{ justifyContent: "center", alignItems: "flex-end" }}
            >
              <Grid2 size={{ xs: 12, sm: 8 }}>
                <Collapse in={isTableOpen} timeout="auto">
                  <Box sx={{ mt: 4 }} />
                  <StatisticsTable
                    data={collectionTableData}
                    header={[
                      headerType,
                      "Kilograms harvested",
                      "Kilograms sold",
                      "Sold for",
                    ]}
                  />
                </Collapse>
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Collapse in={isTableOpen} timeout="auto">
                  <Box sx={{ mt: 4, width: "100%" }} />
                  <StatisticsTable
                    data={costTableData}
                    header={[headerType, "Costs"]}
                  />
                </Collapse>
              </Grid2>
            </Grid2>
          </BoxPaper>
        </>
      )}
      {chartData && (
        <>
          <Box sx={{ mt: 4 }} />
          <BoxPaper>
            <DisplayLineChart
              chartName={getChartTitle({
                metricName: "Berries harvested",
                radioValue: radioValue,
                year: year,
                month: month,
              })}
              chartData={chartData?.harvests}
              xAxisLabel={headerType}
              yAxisLabel="kg"
            />
          </BoxPaper>
          <Box sx={{ mt: 4 }} />
          <BoxPaper>
            <DisplayLineChart
              chartName={getChartTitle({
                metricName: "Berries sold",
                radioValue: radioValue,
                year: year,
                month: month,
              })}
              chartData={chartData?.salesKilograms}
              xAxisLabel={headerType}
              yAxisLabel="kg"
            />
          </BoxPaper>
          <Box sx={{ mt: 4 }} />
          <BoxPaper>
            <DisplayLineChart
              chartName={getChartTitle({
                metricName: "Berries revenue",
                radioValue: radioValue,
                year: year,
                month: month,
              })}
              chartData={chartData?.harvests}
              xAxisLabel={headerType}
              yAxisLabel="eur"
            />
          </BoxPaper>
        </>
      )}
    </>
  );
}
