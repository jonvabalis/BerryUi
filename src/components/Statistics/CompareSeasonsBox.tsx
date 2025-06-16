import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { YearSelect } from "./StatisticsData";
import { GetButton } from "./GetButton";
import { BoxPaper } from "../Reusable/BoxPaper";
import { BerryType } from "../Themes/BerryData";
import React from "react";
import {
  CompareByYearStatisticsDto,
  useGetCompareByYearStatistics,
} from "../../api/statistics/useGetCompareByYearStatistics";
import DisplayMultipleLineChart from "./Charts/DisplayMultipleLineChart";

interface CompareSeasonsBoxProps {
  berryTypeData: BerryType;
  yearSelectValues: YearSelect[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CompareSeasonsBox({
  berryTypeData,
  yearSelectValues,
}: CompareSeasonsBoxProps) {
  const [years, setYears] = React.useState<number[]>([]);
  const [headerYears, setHeaderYears] = useState<string>("");
  const [chartData, setChartData] = useState<CompareByYearStatisticsDto>();

  const handleChange = (event: SelectChangeEvent<typeof years>) => {
    const {
      target: { value },
    } = event;
    const stringValues = typeof value === "string" ? value.split(",") : value;
    const numberValues = stringValues.map((item) => Number(item)).sort();
    setYears(numberValues);
  };

  const useGetCompareByYearStatisticsQuery = useGetCompareByYearStatistics(
    berryTypeData.id,
    years
  );

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
          <FormControl sx={{ minWidth: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Year</InputLabel>
            <Select
              labelId="multiple-checkbox-label"
              id="multiple-checkbox"
              multiple
              value={years}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {yearSelectValues.map((yearSelect) => (
                <MenuItem key={yearSelect.value} value={yearSelect.value}>
                  <Checkbox checked={years.includes(yearSelect.value)} />
                  <ListItemText primary={yearSelect.text} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
