import { useState, useMemo, useCallback } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { BoxPaper } from "../Reusable/BoxPaper";
import { RecordedDataDay, RecordedDataDayProps } from "./RecordedDataDay";
import { useGetAllRecordedDaysByYear } from "../../api/history/useGetAllRecordedDaysByYear";
import Grid2 from "@mui/material/Grid2";
import { useGetBriefByDay } from "../../api/history/useGetBriefByDay";
import HistoryTotalDataBriefTable from "./HistoryTotalDataBriefTable";
import Typography from "@mui/material/Typography/Typography";
import HistoryEmployeeDataBriefTable from "./HistoryEmployeeDataBriefTable";

interface HistoryDataBoxProps {
  selectedDate: Dayjs;
  setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}

export default function HistoryDataBox({
  selectedDate,
  setSelectedDate,
}: HistoryDataBoxProps) {
  const [currentDataYear, setCurrentDataYear] = useState<number>(
    selectedDate ? selectedDate.year() : dayjs().hour(23).year
  );

  const { data: datesWithData } = useGetAllRecordedDaysByYear(currentDataYear);
  const { data: selectedDateBrief } = useGetBriefByDay(
    selectedDate.format("YYYY-MM-DD")
  );

  const calendarSlotProps = useMemo(
    () => ({
      day: {
        highlightedDays: datesWithData,
      } as RecordedDataDayProps,
    }),
    [datesWithData]
  );

  const handleDateChange = useCallback(
    (date: Dayjs) => {
      setSelectedDate(date);
      if (date && date.year() !== currentDataYear) {
        setCurrentDataYear(date.year());
      }
    },
    [currentDataYear]
  );

  const handleMonthChange = useCallback(
    (newMonthDate: Dayjs) => {
      const newMonthYear = newMonthDate.year();
      if (newMonthYear !== currentDataYear) {
        setCurrentDataYear(newMonthYear);
      }
    },
    [currentDataYear]
  );

  const handleYearChange = useCallback(
    (newYearDate: Dayjs) => {
      const newYear = newYearDate.year();
      if (newYear !== currentDataYear) {
        setCurrentDataYear(newYear);
      }
    },
    [currentDataYear]
  );

  return (
    <BoxPaper>
      <Grid2 container spacing={{ xs: 4, sm: 4, lg: 8 }}>
        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar<Dayjs>
              value={selectedDate}
              onChange={handleDateChange}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
              slots={{ day: RecordedDataDay }}
              slotProps={calendarSlotProps}
              sx={{
                width: "100%",
                minWidth: { xs: 280, sm: 320 },
                maxHeight: { xs: 380, sm: 420, md: 460, lg: 520 },
                maxWidth: { sm: 380, md: 420, lg: 480 },
                padding: { xs: 0.5, sm: 1, lg: 2 },
                height: "auto",
                border: "2px solid",
                boxShadow: 3,
                borderColor: "primary.main",
                borderRadius: 2,
                "& .MuiPickersDay-root": {
                  width: { xs: 30, sm: 36 },
                  height: { xs: 30, sm: 36 },
                  fontSize: { xs: "0.7rem", sm: "1rem" },
                },
                "& .MuiDayCalendar-weekDayLabel": {
                  width: { xs: 30, sm: 36 },
                  fontSize: { xs: "0.7rem", sm: "1rem" },
                },
                "& .MuiPickersCalendarHeader-root": {
                  px: { xs: 0.5, sm: 1 },
                  my: { xs: 0.5, sm: 1, md: 1.5 },
                },
                "& .MuiPickersCalendarHeader-label": {
                  fontWeight: "medium",
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                },
                "& .MuiPickersArrowSwitcher-button": {
                  color: "text.primary",
                },
              }}
            />
          </LocalizationProvider>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, lg: 8 }}>
          {selectedDateBrief ? (
            <Grid2 container spacing={4}>
              <HistoryTotalDataBriefTable data={selectedDateBrief.totals} />
              <HistoryEmployeeDataBriefTable
                data={selectedDateBrief.employees}
              />
            </Grid2>
          ) : (
            <Typography>Please wait...</Typography>
          )}
        </Grid2>
      </Grid2>
    </BoxPaper>
  );
}
