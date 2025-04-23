import { Dayjs } from "dayjs";

export function dayjsToUTCDate(selectedDate: Dayjs): Date {
  return new Date(
    Date.UTC(
      selectedDate.utc().year(),
      selectedDate.utc().month(),
      selectedDate.utc().date(),
      selectedDate.utc().hour(),
      selectedDate.utc().minute(),
      selectedDate.utc().second(),
      selectedDate.utc().millisecond()
    )
  );
}
