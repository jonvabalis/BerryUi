import {
  Box,
  Fade,
  Grid2,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
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
      <Box sx={{ width: "100%", maxWidth: "1000px", mx: "auto" }}>
        <Fade in={true} timeout={500}>
          <Paper
            elevation={5}
            sx={{
              p: 4,
              borderRadius: 4,
              background: "white",
            }}
          >
            <Grid2 container spacing={4}>
              <Grid2
                container
                spacing={1}
                size={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
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
                <Grid2
                  container
                  size={{ xs: 12, sm: 9, md: 9 }}
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
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
                      data={YEAR_SELECT_DATA}
                      value={year}
                      setState={setYear}
                      label={"Year"}
                      radioValue={radioValue}
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
                    }}
                    onError={(error) => {
                      toast.error(error.message);
                    }}
                  />
                </Box>
              </Grid2>
            </Grid2>
          </Paper>
        </Fade>
      </Box>

      <Box sx={{ width: "100%", maxWidth: "1000px", mx: "auto" }}>
        <Fade in={true} timeout={500}>
          <Paper
            elevation={5}
            sx={{
              p: 4,
              borderRadius: 4,
              background: "white",
            }}
          >
            <Grid2 container spacing={4}>
              <StatisticsTable
                data={collectionTableData}
                header={[
                  headerType,
                  "Kilograms harvested",
                  "Kilograms sold",
                  "Sold for",
                ]}
              />
              <GridContainer span={6}>
                <StatisticsTable
                  data={costTableData}
                  header={[headerType, "Costs"]}
                />
              </GridContainer>
            </Grid2>
          </Paper>
        </Fade>
      </Box>
    </>
  );
}
