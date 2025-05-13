import {
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers/PickersDay/PickersDay";
import { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge/Badge";
import React from "react";

export interface RecordedDataDayProps extends PickersDayProps<Dayjs> {
  highlightedDays?: string[];
}

export const RecordedDataDay = React.memo((props: RecordedDataDayProps) => {
  const { day, outsideCurrentMonth, highlightedDays = [], ...other } = props;
  const formattedDay = day.format("YYYY-MM-DD");
  const isHighlighted =
    !outsideCurrentMonth && highlightedDays.includes(formattedDay);

  return (
    <Badge
      overlap="circular"
      badgeContent={isHighlighted ? "" : null}
      color="primary"
      sx={{
        ".MuiBadge-badge": {
          width: 8,
          height: 8,
          padding: 0,
          minWidth: 0,
          backgroundColor: "primary.main",
          boxShadow: "0 0 0 1px white",
        },
      }}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
});
